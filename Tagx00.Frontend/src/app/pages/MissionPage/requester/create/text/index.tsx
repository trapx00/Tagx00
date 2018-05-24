import React from 'react';
import { MissionCreateInfoForm } from "../MissionCreateInfoForm";
import { action, observable } from "mobx";
import { TextMissionCreateInfo } from "./TextMissionCreateInfo";
import { Checkbox, Button } from 'antd';
import { FormItem } from "../../../../../components/Form/FormItem";
import { LocaleMessage } from "../../../../../internationalization/components";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { TagSelector } from "../../../../../components/TagSelector";

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

@observer
export default class TextMissionCreateInfoForm extends React.Component<Props, {}> {

  @observable info: TextMissionCreateInfo = new TextMissionCreateInfo();
  @observable submitting = false;

  @Inject localeStore: LocaleStore;

  @action submit = async () => {
    this.info.createAttempted = true;
  };

  localeMessage = (id: string): string => {
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


  render() {
    return <MissionCreateInfoForm info={this.info}
                                  submitting={this.submitting}
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
                     placeholder={this.localeMessage("classification.placeholder")}/>
      </FormItem>
      <FormItem valid={true} messageOnInvalid={""}>
        <Checkbox checked={this.info.enableKeywords} onChange={this.onKeywordsEnableChanged}/>
        <span>{this.localeMessage("keywords.prompt")}</span>
        <TagSelector onSelectedChanged={this.onKeywordsChanged}
                     selectedTags={this.info.keywords}
                     placeholder={this.localeMessage("keywords.placeholder")}
        />
      </FormItem>
      <FormItem valid={this.info.zipValid} messageOnInvalid={this.localeMessage("zip.requireZip")}>
        <p>{this.localeMessage("zip.prompt")}</p>
      </FormItem>

    </MissionCreateInfoForm>
  }
}
