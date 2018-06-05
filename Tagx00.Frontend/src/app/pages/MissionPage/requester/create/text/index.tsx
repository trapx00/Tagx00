import React from 'react';
import { MissionCreateInfoForm, showCompleteModal, UploadStage } from "../MissionCreateInfoForm";
import { action, observable } from "mobx";
import { TextMissionCreateInfo } from "./TextMissionCreateInfo";
import { Checkbox, Button } from 'antd';
import { FormItem } from "../../../../../components/Form/FormItem";
import { LocaleMessage } from "../../../../../internationalization/components";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { TagSelector } from "../../../../../components/TagSelector";
import { UploadPanel } from "../UploadPanel";
import { UploadFile } from "antd/es/upload/interface";
import { RequesterService } from "../../../../../api/RequesterService";
import { RouterStore } from "../../../../../stores/RouterStore";
import { waitForMs } from "../../../../../../utils/Wait";

interface Props {

}

/*
        "TEXT": {
          "classification": {
            "prompt": "主题分类（工人只能在预设主题中选择）",
            "requireClasses": "请至少填入一个预设主题"
          },
          "keywords": {
            "prompt": "提取主题词（工人可自定义主题词）",
          },
          "zip": {
            "prompt": "请讲所有文本文件处理成TXT文件，然后打包上传。",
            "upload": "上传",
          }
        },
 */

const ID_PREFIX = "missions.createMission.fields.TEXT.";


function valid(file: UploadFile) {
  return file.name.endsWith(".zip");
}

@observer
export default class TextMissionCreateInfoForm extends React.Component<Props, {}> {

  @observable info: TextMissionCreateInfo = new TextMissionCreateInfo();
  @observable uploadStage: UploadStage = UploadStage.NotStarted;

  @Inject routerStore: RouterStore;
  @Inject requesterService: RequesterService;
  @Inject localeStore: LocaleStore;

  @action setStage(stage: UploadStage) {
    this.uploadStage = stage;
  }

  @action submit = async () => {
    this.info.createAttempted = true;

    if (!this.info.valid()) {
      return;
    }


    this.setStage(UploadStage.Info);
    // upload the info and obtain the token and id
    const {token, id} = await this.requesterService.createMission(this.info.missionCreateVo());


    this.setStage(UploadStage.CoverImage);
    // upload cover image
    if (this.info.coverImage) {
      const coverFormData = new FormData();
      coverFormData.append("files[]", this.info.coverImage as any);
      const coverUrl = await this.requesterService.uploadImageFile(id, coverFormData, 1, true, token);
    }


    this.setStage(UploadStage.Attachments);
    // upload the text zip
    const zipFormData = new FormData();
    zipFormData.append("files[]", this.info.zip as any);
    await this.requesterService.uploadTextZipFile(id, zipFormData, token);

    this.setStage(UploadStage.NotStarted);
    //completed

    showCompleteModal(id, this.routerStore, this.localeStore);

  };

  localeMessage(id: string) {
    return this.localeStore.get(ID_PREFIX + id) as string;
  };

  @action onClassificationEnableChanged = (e) => {
    this.info.enableClassification = e.target.checked;
  };


  @action onClassesChanged = (classes: string[]) => {
    this.info.classes = classes;
  };

  @action onKeywordsEnableChanged = (e) => {
    this.info.enableKeywords = e.target.checked;
  };

  @action onKeywordsChanged = (keywords: string[]) => {
    this.info.keywords = keywords;
  };

  @action onFileListChange = (list: UploadFile[]) => {
    this.info.zip = list[0];
  };


  render() {
    return <MissionCreateInfoForm info={this.info}
                                  stage={this.uploadStage}
                                  submit={this.submit}
                                  title={this.localeMessage("title")}
    >
      <FormItem valid={this.info.taskValid} messageOnInvalid={this.localeMessage("requireTask")}>
      </FormItem>
      <FormItem valid={this.info.classificationValid}
                messageOnInvalid={this.localeMessage("classification.requireClasses")}>
        <Checkbox checked={this.info.enableClassification} onChange={this.onClassificationEnableChanged}/>
        <span>{this.localeMessage("classification.prompt")}</span>
        <TagSelector onSelectedChanged={this.onClassesChanged}
                     selectedTags={this.info.classes}
                     placeholder={this.localeMessage("classification.placeholder")}
                     style={{display: "block", width: "100%"}}
        />
      </FormItem>
      <FormItem valid={true} messageOnInvalid={""}>
        <Checkbox checked={this.info.enableKeywords} onChange={this.onKeywordsEnableChanged}/>
        <span>{this.localeMessage("keywords.prompt")}</span>
        <TagSelector onSelectedChanged={this.onKeywordsChanged}
                     selectedTags={this.info.keywords}
                     placeholder={this.localeMessage("keywords.placeholder")}
                     style={{display: "block", width: "100%"}}
        />
      </FormItem>
      <FormItem valid={this.info.zipValid} messageOnInvalid={this.localeMessage("zip.requireZip")}>
        <p>{this.localeMessage("zip.prompt")}</p>
        <UploadPanel onFileListChange={this.onFileListChange}
                     fileList={[this.info.zip].filter(x => !!x)}
                     maxFileNum={1}
                     multiple={false}
                     accept={".zip"}
                     valid={valid}
                     buttonChildren={this.localeMessage("zip.selectFile")}/>
      </FormItem>

    </MissionCreateInfoForm>
  }
}
