import { LocaleStore } from "../../../../../stores/LocaleStore";
import { MissionCreateInfoForm, showCompleteModal, UploadStage } from "../MissionCreateInfoForm";
import { observer } from "mobx-react";
import { RequesterService } from "../../../../../api/RequesterService";
import { Inject } from "react.di";
import { PayService } from "../../../../../api/PayService";
import React from "react";
import { UserStore } from "../../../../../stores/UserStore";
import { FormItem } from "../../../../../components/Form/FormItem";
import { RouterStore } from "../../../../../stores/RouterStore";
import { action, observable, toJS } from "mobx";
import { TopicService } from "../../../../../api/TopicService";
import { ThreeDimensionMissionCreateInfo } from "./3dMissionCreateInfo";
import { Checkbox, DatePicker } from "antd";
import { TagSelector } from "../../../../../components/TagSelector";
import { ThreeDimensionUploadPanel } from "./ThreeDimensionUploadPanel";


const CheckboxGroup = Checkbox.Group;
const {RangePicker} = DatePicker;

interface Props {

}

const ID_PREFIX = "missions.createMission.";

@observer
export default class ThreeDimensionMissionCreateInfoForm extends React.Component<Props, {}> {

  @observable info: ThreeDimensionMissionCreateInfo = new ThreeDimensionMissionCreateInfo();
  @observable uploadStage = UploadStage.NotStarted;

  @Inject localeStore: LocaleStore;
  @Inject routerStore: RouterStore;
  @Inject requesterService: RequesterService;
  @Inject topicService: TopicService;
  @Inject payService: PayService;
  @Inject userStore: UserStore;

  @action onFileListChange = (files) => {
    this.info.threeDimensions = files;
  };

  @action upload = async () => {
    console.log(this.info.threeDimensions);

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

      const coverUrl = await this.requesterService.uploadImageFile(id, coverFormData, 1, true, token);
    }

    this.setStage(UploadStage.Attachments);

    for (let i = 0; i < this.info.threeDimensions.length; i++) {
      const threeDimensionFormData = new FormData();
      threeDimensionFormData.append("mtl", this.info.threeDimensions[i].mtl as any);
      threeDimensionFormData.append("obj", this.info.threeDimensions[i].obj as any);
      const img = await this.requesterService.uploadThreeDimensionFile(id, threeDimensionFormData, i + 2, false, token);
      console.log(img);
    }

    this.setStage(UploadStage.NotStarted);

    showCompleteModal(id, this.routerStore, this.localeStore);
  };

  render() {
    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}fields.THREE_DIMENSION.${key}`) as string;
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

        <p>{locale["types.name"]}</p>
        <p>{locale["types.WHOLE"]}</p>
        <br/>

      <FormItem valid={this.info.threeDimensionsValid} messageOnInvalid={locale["requireThreeDimensions"]}>
        <p>{locale["threeDimensions"]}</p>
        <ThreeDimensionUploadPanel onFileListChange={this.onFileListChange}
                          fileList={this.info.threeDimensions}
                          maxFileNum={Number.MAX_SAFE_INTEGER}
                          multiple={true}
                          buttonChildren={locale.selectFile}
        />
      </FormItem>
    </MissionCreateInfoForm>;
  }

}