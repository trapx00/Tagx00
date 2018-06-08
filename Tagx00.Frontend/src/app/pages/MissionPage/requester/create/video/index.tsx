import { MissionCreateInfoForm, showCompleteModal, UploadStage } from "../MissionCreateInfoForm";
import { Checkbox, DatePicker } from "antd";
import { observer } from "mobx-react";
import { action, observable, toJS } from "mobx";
import { Inject } from "react.di";
import { PayService } from "../../../../../api/PayService";
import React from "react";
import { FormItem } from "../../../../../components/Form/FormItem";
import { UserStore } from "../../../../../stores/UserStore";
import { RouterStore } from "../../../../../stores/RouterStore";
import { TopicService } from "../../../../../api/TopicService";
import { VideoMissionCreateInfo } from "./VideoMissionCreateInfo";
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { RequesterService } from "../../../../../api/RequesterService";
import { VideoMissionType } from "../../../../../models/mission/video/VideoMission";
import { TagSelector } from "../../../../../components/TagSelector";
import { VideoUploadPanel } from "./VideoUploadPanel";

const CheckboxGroup = Checkbox.Group;
const {RangePicker} = DatePicker;

interface Props {

}
const ID_PREFIX = "missions.createMission.";

@observer
export default class VideoMissionCreateInfoForm extends React.Component<Props, {}> {
  @observable info: VideoMissionCreateInfo = new VideoMissionCreateInfo();
  @observable uploadStage = UploadStage.NotStarted;

  @Inject localeStore: LocaleStore;
  @Inject routerStore: RouterStore;
  @Inject requesterService: RequesterService;
  @Inject topicService: TopicService;
  @Inject payService: PayService;
  @Inject userStore: UserStore;

  @action onTypeChange = (checkedValues: string[]) => {
    this.info.videoMissionTypes = checkedValues.map(x => VideoMissionType[x]);
  };

  @action onFileListChange = (files) => {
    this.info.videos = files;
  };

  @action upload = async () => {
    console.log(this.info.videos);

  };

  @action onTagsChange = (tags: string[]) => {
    this.info.tags = tags;
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

      const coverUrl = await this.requesterService.uploadVideoFile(id, coverFormData, 1, true, token);
    }

    this.setStage(UploadStage.Attachments);

    for (let i = 0; i < this.info.videos.length; i++) {
      const videoFormData = new FormData();
      videoFormData.append("files[]", this.info.videos[i] as any);
      const img = await this.requesterService.uploadVideoFile(id, videoFormData, i + 2, false, token);
      console.log(img);
    }

    this.setStage(UploadStage.NotStarted);

    showCompleteModal(id, this.routerStore, this.localeStore);
  };

  render() {
    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}fields.VIDEO.${key}`) as string;
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
                       selectedTags={toJS(this.info.tags)}
                       placeholder={locale.tags}
                       style={{display: "block", width: "100%"}}
          />
        </div>
      </FormItem>
      <FormItem valid={this.info.videosValid} messageOnInvalid={locale["requireTypes"]}>
        <p>{locale["types.name"]}</p>
        <CheckboxGroup options={Object.keys(VideoMissionType).map(x => ({label: locale[`types.${x}`], value: x}))}
                       value={toJS(this.info.videoMissionTypes)}
                       onChange={this.onTypeChange}/>
      </FormItem>
      <FormItem valid={this.info.videosValid} messageOnInvalid={locale["requireVideos"]}>
        <p>{locale["videos"]}</p>
        <VideoUploadPanel onFileListChange={this.onFileListChange}
                          fileList={this.info.videos}
                          maxFileNum={Number.MAX_SAFE_INTEGER}
                          multiple={true}
                          buttonChildren={locale.selectFile}
        />
      </FormItem>
    </MissionCreateInfoForm>;
  }
}
