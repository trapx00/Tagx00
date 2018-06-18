import { observer } from "mobx-react";
import React from "react";
import { RouterStore } from "../../../../../stores/RouterStore";
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { RequesterService } from "../../../../../api/RequesterService";
import { Inject } from "react.di";
import { PayService } from "../../../../../api/PayService";
import { TopicService } from "../../../../../api/TopicService";
import { UserStore } from "../../../../../stores/UserStore";
import { action, observable, toJS } from "mobx";
import { AudioMissionCreateInfo } from "./AudioMissionCreateInfo";
import { MissionCreateInfoForm, showCompleteModal, UploadStage } from "../MissionCreateInfoForm";
import { AudioMissionType } from "../../../../../models/mission/audio/AudioMission";
import { Checkbox, DatePicker } from "antd";
import { FormItem } from "../../../../../components/Form/FormItem";
import { TagSelector } from "../../../../../components/TagSelector";
import { AudioUploadPanel } from "./AudioUploadPanel";


const CheckboxGroup = Checkbox.Group;
const {RangePicker} = DatePicker;

interface Props {

}
const ID_PREFIX = "missions.createMission.";

@observer
export default class AudioMissionCreateInfoForm extends React.Component<Props, {}> {
  @observable info: AudioMissionCreateInfo = new AudioMissionCreateInfo();
  @observable uploadStage = UploadStage.NotStarted;

  @Inject localeStore: LocaleStore;
  @Inject routerStore: RouterStore;
  @Inject requesterService: RequesterService;
  @Inject topicService: TopicService;
  @Inject payService: PayService;
  @Inject userStore: UserStore;

  @action onTypeChange = (checkedValues: string[]) => {
    this.info.audioMissionTypes = checkedValues.map(x => AudioMissionType[x]);
  };

  @action onFileListChange = (files) => {
    this.info.audios = files;
  };

  @action upload = async () => {
    console.log(this.info.audios);

  };

  @action onTagsChange = (tags: string[]) => {
    this.info.allowedTags = tags;
  };

  @action setStage(stage: UploadStage) {
    this.uploadStage = stage;
  };

  @action onAllowCustomTagChanged = (e) => {
    this.info.allowCustomTag = e.target.checked;
  };

  @action submit = async () => {

    this.info.createAttempted = true;
    if (!this.info.valid()) {
      return;
    }

    this.setStage(UploadStage.Info);

    const {token, id} = await this.requesterService.createMission(this.info.missionCreateVo());

    this.setStage(UploadStage.CoverImage);

    if (this.info.coverImage) {
      const coverFormData = new FormData();
      coverFormData.append("files[]", this.info.coverImage as any);

      const coverUrl = await this.requesterService.uploadImageFile(id, coverFormData, 1, true, token);
    }

    this.setStage(UploadStage.Attachments);

    for (let i = 0; i < this.info.audios.length; i++) {
      const audioFormData = new FormData();
      audioFormData.append("files[]", this.info.audios[i] as any);
      const img = await this.requesterService.uploadAudioFile(id, audioFormData, i + 2, false, token);
      console.log(img);
    }

    this.setStage(UploadStage.NotStarted);

    showCompleteModal(id, this.routerStore, this.localeStore);
  };

  render() {
    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}fields.AUDIO.${key as string}`) as string;
      }
    });
    return <MissionCreateInfoForm info={this.info}
                                  submit={this.submit}
                                  stage={this.uploadStage}
                                  title={locale.title}
    >
      <FormItem valid={this.info.allowedTagsValid} messageOnInvalid={locale.requireTags}>
        <span style={{marginRight: "16px"}}>{locale.tags}</span>
        <Checkbox checked={this.info.allowCustomTag} onChange={this.onAllowCustomTagChanged}>
          {locale.allowCustomTag}
        </Checkbox>
        <div>
          <TagSelector onSelectedChanged={this.onTagsChange}
                       selectedTags={toJS(this.info.allowedTags)}
                       placeholder={locale.tags}
                       style={{display: "block", width: "100%"}}
          />
        </div>
      </FormItem>
      <FormItem valid={this.info.audioTypesValid} messageOnInvalid={locale["requireTypes"]}>
        <p>{locale["types.name"]}</p>
        <CheckboxGroup options={Object.keys(AudioMissionType).map(x => ({label: locale[`types.${x}`], value: x}))}
                       value={toJS(this.info.audioMissionTypes)}
                       onChange={this.onTypeChange}/>
      </FormItem>
      <FormItem valid={this.info.audiosValid} messageOnInvalid={locale["requireAudios"]}>
        <p>{locale["audios"]}</p>
        <AudioUploadPanel onFileListChange={this.onFileListChange}
                          fileList={this.info.audios}
                          maxFileNum={Number.MAX_SAFE_INTEGER}
                          multiple={true}
                          buttonChildren={locale.selectFile}
        />
      </FormItem>
    </MissionCreateInfoForm>;
  }
}
