import React, { ReactNode } from 'react';
import { action, toJS } from "mobx";
import { Inject } from "react.di";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Progress } from "antd";
import moment from 'moment';
import { FormItem } from "../../../../components/Form/FormItem";
import { TopicSelector } from "./image/TopicSelector";
import { ImageUploadPanel } from "./ImageUploadPanel";
import { CreditInput } from "../../../../components/Pay/CreditInput";
import { MissionCreateInfo } from "./MissionCreateInfo";
import { observer } from "mobx-react";
import { LocaleMessage } from "../../../../internationalization/components";
import { RouterStore } from "../../../../stores/RouterStore";

const {RangePicker} = DatePicker;


export function showCompleteModal(missionId: string, routerStore: RouterStore, localeStore: LocaleStore) {
  const modalIdPrefix = ID_PREFIX + "completeCreation.";

  const modal = Modal.success({
    title: localeStore.get(modalIdPrefix + "title"),
    content: localeStore.get(modalIdPrefix + "description", {
      to: <a onClick={() => {
        modal.destroy();
        routerStore.jumpTo(`/mission?missionId=${missionId}`);
      }}>
        {localeStore.get(modalIdPrefix + "to")}
      </a>
    }),
  });
}

export enum UploadStage {
  NotStarted,
  Info = 0,
  CoverImage = 1,
  Attachments = 2,
  Completed
}

interface Props {
  info: MissionCreateInfo;

  submit(): Promise<void>;

  stage: UploadStage;
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
        return this.localeStore.get(`${ID_PREFIX}fields.${key as string}`) as string;
      }
    });
    return <Row gutter={16}>
      <Col xs={24} sm={12}>
        <h3>{locale.generalProperties}</h3>
        <Form className="login-form">
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
        <Button type={"primary"} loading={this.props.stage !== UploadStage.NotStarted} onClick={this.submit}>
          {locale["submit"]}
        </Button>
        {this.props.stage !== UploadStage.NotStarted &&
        <div>
          <Progress percent={this.props.stage / 3 * 100} status={"active"} showInfo={false}
          />
          <p><LocaleMessage id={`${ID_PREFIX}uploadStage.${this.props.stage}`}/></p>
        </div>
        }
      </Col>
    </Row>
  }
}
