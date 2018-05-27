import React from 'react';
import { observer } from "mobx-react";
import { action, observable, runInAction, toJS } from "mobx";
import { ImageMissionCreateInfo } from "./ImageMissionCreateInfo";
import { Checkbox, DatePicker, Modal, Button } from 'antd';
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { ImageUploadPanel } from "../ImageUploadPanel";
import { RequesterService } from "../../../../../api/RequesterService";
import { Inject } from "react.di";
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { Link } from 'react-router-dom';
import { RouterStore } from "../../../../../stores/RouterStore";
import { TagSelector } from "../../../../../components/TagSelector";
import { TopicService } from "../../../../../api/TopicService";
import { FormItem } from "../../../../../components/Form/FormItem";
import { PayService } from "../../../../../api/PayService";
import { UserStore } from "../../../../../stores/UserStore";
import { MissionCreateInfoForm, showCompleteModal, UploadStage } from "../MissionCreateInfoForm";
import { LocaleMessage } from "../../../../../internationalization/components";

const CheckboxGroup = Checkbox.Group;
const {RangePicker} = DatePicker;

interface Props {

}

const ID_PREFIX = "missions.createMission.";



/**
 *       "fields": {
        "title": "任务标题",
        "requireTitle": "请输入任务标题",
        "description": "任务描述",
        "requireDescription": "请输入任务描述",
        "topics": "主题词",
        "availableTopics": "可选主题词",
        "startDate": "开始时间",
        "requireStartDate": "请选择任务开始时间",
        "endDate": "结束时间",
        "requireEndDate": "请选择任务结束时间",
        "cover": "封面图",
        "selectFile": "选择文件",
        "IMAGE": {
          "type": {
            "DISTRICT": "区域",
            "WHOLE":"整体",
            "PART": "局部"
          },
          "requireImage": "请上传至少一张图片"
        }
      },
 */

@observer
export default class ImageMissionCreateInfoForm extends React.Component<Props, {}> {

  @observable info: ImageMissionCreateInfo = new ImageMissionCreateInfo();
  @observable uploadStage = UploadStage.NotStarted;

  @Inject localeStore: LocaleStore;
  @Inject routerStore: RouterStore;
  @Inject requesterService: RequesterService;
  @Inject topicService: TopicService;
  @Inject payService: PayService;
  @Inject userStore: UserStore;



  @action onTypeChange = (checkedValues: string[]) => {
    this.info.imageMissionTypes = checkedValues.map(x => ImageMissionType[x]);
  };


  @action onFileListChange = (files) => {
    this.info.images = files;
  };


  @action upload = async () => {
    console.log(this.info.images);

  };


  @action onTagsChange = (tags: string[]) => {
    this.info.allowedTags = tags;
  };

  @action setStage(stage: UploadStage) {
    this.uploadStage = stage;
  }

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

    for (let i = 0; i < this.info.images.length; i++) {
      const imageFormData = new FormData();
      imageFormData.append("files[]", this.info.images[i] as any);
      const img = await this.requesterService.uploadImageFile(id, imageFormData, i + 2, false, token);
      console.log(img);
    }

    this.setStage(UploadStage.NotStarted);

    showCompleteModal(id, this.routerStore, this.localeStore);
  };

  @action onAllowCustomTagChanged = (e) => {
    this.info.allowCustomTag = e.target.checked;
  };


  render() {
    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}fields.IMAGE.${key}`) as string;
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
        <FormItem valid={this.info.imageTypesValid} messageOnInvalid={locale["requireTypes"]}>
          <p>{locale["types.name"]}</p>
          <CheckboxGroup options={Object.keys(ImageMissionType).map(x => ({label: locale[`types.${x}`], value: x}))}
                         value={toJS(this.info.imageMissionTypes)}
                         onChange={this.onTypeChange}/>
        </FormItem>
        <FormItem valid={this.info.imagesValid} messageOnInvalid={locale["requireImages"]}>
          <p>{locale["images"]}</p>
          <ImageUploadPanel onFileListChange={this.onFileListChange}
                            fileList={this.info.images}
                            maxFileNum={Number.MAX_SAFE_INTEGER}
                            multiple={true}
                            buttonChildren={locale.selectFile}
          />
        </FormItem>
    </MissionCreateInfoForm>;
  }
}
