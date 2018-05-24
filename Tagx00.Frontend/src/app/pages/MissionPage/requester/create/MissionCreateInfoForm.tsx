import React, { ReactNode } from 'react';
import { RequesterService } from "../../../../api/RequesterService";
import { UserStore } from "../../../../stores/UserStore";
import { action, observable, toJS } from "mobx";
import { PayService } from "../../../../api/PayService";
import { Inject } from "react.di";
import { RouterStore } from "../../../../stores/RouterStore";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { Col, DatePicker, Form, Input, Row, Button } from "antd";
import { TopicService } from "../../../../api/TopicService";
import moment from 'moment';
import { FormItem } from "../../../../components/Form/FormItem";
import { TopicSelector } from "./image/TopicSelector";
import { ImageUploadPanel } from "./ImageUploadPanel";
import { CreditInput } from "../../../../components/Pay/CreditInput";
import { MissionCreateInfo } from "./MissionCreateInfo";
import { observer } from "mobx-react";

const { RangePicker } = DatePicker;

interface Props {
  info: MissionCreateInfo;
  submit(): Promise<void>;
  submitting: boolean;
  title: ReactNode;
}

const ID_PREFIX = "missions.createMission.";

@observer
export class MissionCreateInfoForm extends React.Component<Props, {}> {

  @Inject localeStore: LocaleStore;



  @action onTitleChange = (e) => {
    this.props.info.title = e.target.value;
  };

  @action onDescriptionChange = (e) => {
    this.props.info.description = e.target.value;
  };


  @action onCoverImageChange = (files) => {
    this.props.info.coverImage = files[0];
  };


  @action onDateRangeChanged = (dates: [moment.Moment, moment.Moment]) => {
    this.props.info.dateRange = dates;
  };
  
  @action onMissionLevelChanged = (e) => {
    this.props.info.level = e.target.value;
  };

  @action onMinimalWorkerLevelChanged = (e) => {
    this.props.info.minimalWorkerLevel = e.target.value;
  };

  @action onCreditsChanged = (value, valid) => {
    this.props.info.credits = value;
    this.props.info.creditsValid = valid;
  };
  
  @action onTopicChange = (selected: string[]) => {
    this.props.info.topics = selected;
  };

  submit = async () => {
    await this.props.submit();
  };

  render() {
    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}fields.${key}`) as string;
      }
    });
    return <Row gutter={16}>
      <Col xs={24} sm={12}>
        <h3>{locale.generalProperties}</h3>
        <Form className="login-form" >
            <FormItem valid={this.props.info.titleValid} messageOnInvalid={locale.requireTitle}>
              <Input addonBefore={locale.title}
                     onChange={this.onTitleChange}
                     value={this.props.info.title}
              />
            </FormItem>
            <FormItem valid={this.props.info.descriptionValid} messageOnInvalid={locale.requireDescription}>
              <Input.TextArea onChange={this.onDescriptionChange}
                              placeholder={locale.description}
                              value={this.props.info.description}
              />
            </FormItem>
            <FormItem valid={true} messageOnInvalid={""}>
              <TopicSelector selected={this.props.info.topics} onChange={this.onTopicChange}/>
            </FormItem>
            <FormItem valid={true} messageOnInvalid={""}>
              <p>{locale.cover}</p>
              <ImageUploadPanel onFileListChange={this.onCoverImageChange}
                                fileList={[this.props.info.coverImage].filter(x => !!x)}
                                maxFileNum={1}
                                multiple={false}
                                buttonChildren={locale.selectFile}
              />
            </FormItem>
            <FormItem valid={this.props.info.dateRangeValid} messageOnInvalid={locale.requireDateRange}>
              <p>{locale.dateRange}</p>
              <RangePicker value={toJS(this.props.info.dateRange)} onChange={this.onDateRangeChanged}/>
            </FormItem>
            <FormItem valid={this.props.info.minimalWorkerLevelValid}
                      messageOnInvalid={locale.requireMinimalWorkerLevel}
                      messageOnSuccess={locale.requireMinimalWorkerLevel}
            >
              <Input addonBefore={locale.minimalWorkerLevel}
                     onChange={this.onMinimalWorkerLevelChanged}
                     value={this.props.info.minimalWorkerLevel}
              />
            </FormItem>

            <FormItem valid={this.props.info.levelValid}
                      messageOnInvalid={locale.requireMissionLevel}
                      messageOnSuccess={locale.requireMissionLevel}
            >
              <Input addonBefore={locale.missionLevel}
                     onChange={this.onMissionLevelChanged}
                     value={this.props.info.level}
              />
            </FormItem>

            <CreditInput onChanged={this.onCreditsChanged}/>
        </Form>
      </Col>
      <Col xs={24} sm={12}>
        <h3>{this.props.title}</h3>
        {this.props.children}
        <Button type={"primary"} loading={this.props.submitting} onClick={this.submit}>
          {locale["submit"]}
        </Button>
      </Col>
    </Row>
  }
}
