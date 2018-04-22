import React, { ReactNode } from 'react';
import { observer } from "mobx-react";
import { action, observable, runInAction, toJS } from "mobx";
import { CreditStatus, ImageMissionCreateInfo } from "./ImageMissionCreateInfo";
import { Checkbox, DatePicker, Form, Input, Modal, Button } from 'antd';
import { FormItemProps } from "antd/lib/form/FormItem";
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { ImageUploadPanel } from "./ImageUploadPanel";
import { RequesterService } from "../../../../../api/RequesterService";
import { Inject } from "react.di";
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { Link } from 'react-router-dom';
import { RouterStore } from "../../../../../stores/RouterStore";
import moment from 'moment';
import { TagSelector } from "../../../../../components/TagSelector";
import { TopicService } from "../../../../../api/TopicService";
import { AsyncComponent, ObserverAsyncComponent } from "../../../../../router/AsyncComponent";
import { Loading } from "../../../../../components/Common/Loading";
import { FormItem } from "../../../../../components/Form/FormItem";
import { RichFormItem } from "../../../../../components/Form/RichFormItem";
import { CurrentCreditsIndicator } from "../../../../../components/Pay/CurrentCreditsIndicator";
import { LocaleMessage } from "../../../../../internationalization/components";
import { PayService } from "../../../../../api/PayService";

const CheckboxGroup = Checkbox.Group;
const {RangePicker} = DatePicker;

interface Props {
  token: string;
}

const ID_PREFIX = "missions.createMission.";


function formItemProps(valid: boolean, error: ReactNode): FormItemProps {
  return {
    validateStatus: valid ? "success" : "error",
    help: valid ? null : error
  };
}


const formStrings = [
  "title",
  "requireTitle",
  "description",
  "requireDescription",
  "topics",
  "availableTopics",
  "startDate",
  "requireStartDate",
  "endDate",
  "requireEndDate",
  "selectFile",
  "minimalWorkerLevel",
  "credits",
  "missionLevel"
].reduce((prev, curr) => ({...prev, [curr]: `${ID_PREFIX}fields.${curr}`}), {});

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
export class ImageMissionCreateInfoForm extends React.Component<Props, {}> {

  @observable info: ImageMissionCreateInfo = new ImageMissionCreateInfo();
  @observable uploading = false;

  @Inject localeStore: LocaleStore;
  @Inject routerStore: RouterStore;
  @Inject requesterService: RequesterService;
  @Inject topicService: TopicService;
  @Inject payService: PayService;



  @action onTitleChange = (e) => {
    this.info.title = e.target.value;
  };

  @action onDescriptionChange = (e) => {
    this.info.description = e.target.value;
  };


  @action onTypeChange = (checkedValues: string[]) => {
    this.info.imageMissionTypes = checkedValues.map(x => ImageMissionType[x]);
  };


  @action onFileListChange = (files) => {
    this.info.images = files;
  };

  @action onCoverImageChange = (files) => {
    this.info.coverImage = files[0];
  };

  @action upload = async () => {
    console.log(this.info.images);

  };

  @action onDateRangeChanged = (dates: [moment.Moment, moment.Moment]) => {
    this.info.dateRange = dates;
  };

  @action onTagsChange = (tags: string[]) => {
    this.info.allowedTags = tags;
  };

  @action onMissionLevelChanged = (e) => {
    this.info.level = e.target.value;
  };

  @action onMinimalWorkerLevelChanged = (e) => {
    this.info.minimalWorkerLevel = e.target.value;
  };

  @action onCreditsChanged = (e) => {
    this.info.credits = e.target.value;
  };

  @action onCreditFetched = (credits) => {
    this.info.remainingCredits = credits;
  };

  componentDidMount() {
    this.payService.getCredits(this.props.token).then(credits => {
      runInAction(() => {
        this.info.remainingCredits = credits.credits;
      });
    })
  }


  @action submit = async () => {

    this.info.createAttempted = true;
    if (!this.info.valid) {
      return;
    }

    const {token, id} = await this.requesterService.createMission(this.info.missionCreateVo, this.props.token);

    console.log(token, id);

    // upload cover

    runInAction(() => {
      this.uploading = true;
    });
    const coverFormData = new FormData();
    coverFormData.append("files[]", this.info.coverImage as any);

    const coverUrl = await this.requesterService.uploadImageFile(id, coverFormData, 1, true, token);

    for (let i = 0; i < this.info.images.length; i++) {
      const imageFormData = new FormData();
      imageFormData.append("files[]", this.info.images[i] as any);
      const img = await this.requesterService.uploadImageFile(id, imageFormData, i + 2, false, token);
      console.log(img);
    }

    const modalIdPrefix = ID_PREFIX + "completeCreation.";

    const modal = Modal.success({
      title: this.localeStore.get(modalIdPrefix + "title"),
      content: this.localeStore.get(modalIdPrefix + "description", {
        to: <a onClick={() => {
          modal.destroy();
          this.routerStore.jumpTo(`/mission?missionId=${id}`);
        }}>
          {this.localeStore.get(modalIdPrefix + "to")}
        </a>
      }),
    });

    runInAction(() => this.uploading = false);
  };

  @action onAllowCustomTagChanged = (e) => {
    this.info.allowCustomTag = e.target.checked;
  };

  @action onTopicChange = (selected: string[]) => {
    this.info.topics = selected;
  };

  creditsMapStatusToFormProps = (status: CreditStatus): FormItemProps => {
    const prefix = ID_PREFIX + "fields.creditsError.";
    switch (status) {
      case CreditStatus.Loading:
        return {
          validateStatus: "success",
          help: <LocaleMessage id={prefix + "loading"}/>
        };
      case CreditStatus.CreditsNotSufficient:
        return {
          validateStatus: "error",
          help: <LocaleMessage id={prefix + "insufficient"} replacements={{
            current: this.info.remainingCredits+"",
            goPay: <Link to={"/pay/account"}><LocaleMessage id={prefix + "goPay"}/></Link>
          }}/>
        };
      case CreditStatus.FirstAttempt:
      case CreditStatus.Acceptable:
        return {
          validateStatus: "success",
          help: <LocaleMessage id={prefix + "remaining"} replacements={{
            current: this.info.remainingCredits+""
          }}/>,
        };
      case CreditStatus.WrongFormat:
        return {
          validateStatus: "success",
          help: <LocaleMessage id={prefix+"format"}/>
        }
    }
  };

  renderTopicSelector = async () => {
    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}fields.${key}`) as string;
      }
    });
    const topics = (await this.topicService.getAllTopics()).topics;
    return React.createElement(observer(() => <div>
        {locale.topics}
      <TagSelector onSelectedChanged={this.onTopicChange}
                   selectedTags={toJS(this.info.topics)}
                   availableTags={topics.map(x => x.value)}
                   allowCustomTag={false}
                   placeholder={locale.topics}
      />
      </div>));
  };


  render() {
    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}fields.${key}`) as string;
      }
    });
    return <Form className="login-form">
      <FormItem valid={this.info.titleValid} messageOnInvalid={locale.requireTitle}>
        <Input addonBefore={locale.title}
               onChange={this.onTitleChange}
               value={this.info.title}
        />
      </FormItem>
      <FormItem valid={this.info.descriptionValid} messageOnInvalid={locale.requireDescription}>
        <Input.TextArea onChange={this.onDescriptionChange}
                        placeholder={locale.description}
                        value={this.info.description}
        />
      </FormItem>
      <FormItem valid={true} messageOnInvalid={""}>
        <ObserverAsyncComponent render={this.renderTopicSelector} componentWhenLoading={<Loading/>}/>
      </FormItem>
      <FormItem valid={this.info.allowedTagsValid} messageOnInvalid={locale.requireTags}>
        <span style={{marginRight: "16px"}}>{locale.tags}</span>
        <Checkbox checked={this.info.allowCustomTag} onChange={this.onAllowCustomTagChanged}>
          {locale.allowCustomTag}
        </Checkbox>
        <TagSelector onSelectedChanged={this.onTagsChange}
                     selectedTags={toJS(this.info.allowedTags)}
                     placeholder={locale.tags}
        />
      </FormItem>
      <FormItem valid={this.info.dateRangeValid} messageOnInvalid={locale.requireDateRange}>
        <p>{locale.dateRange}</p>
        <RangePicker value={toJS(this.info.dateRange)} onChange={this.onDateRangeChanged}/>
      </FormItem>

      <FormItem valid={this.info.minimalWorkerLevelValid}
                messageOnInvalid={locale.requireMinimalWorkerLevel}
                messageOnSuccess={locale.requireMinimalWorkerLevel}
      >
        <Input addonBefore={locale.minimalWorkerLevel}
               onChange={this.onMinimalWorkerLevelChanged}
               value={this.info.minimalWorkerLevel}
        />
      </FormItem>

      <FormItem valid={this.info.levelValid}
                messageOnInvalid={locale.requireMissionLevel}
                messageOnSuccess={locale.requireMissionLevel}
      >
        <Input addonBefore={locale.missionLevel}
               onChange={this.onMissionLevelChanged}
               value={this.info.level}
        />
      </FormItem>

      <RichFormItem status={this.info.creditsStatus}
                    mapToFormProps={this.creditsMapStatusToFormProps}
      >
        <Input addonBefore={locale.credits}
               onChange={this.onCreditsChanged}
               value={this.info.credits}
        />
      </RichFormItem>

      <FormItem valid={this.info.imageTypesValid} messageOnInvalid={locale["IMAGE.requireTypes"]}>
        <p>{locale["IMAGE.types.name"]}</p>
        <CheckboxGroup options={Object.keys(ImageMissionType).map(x => ({label: locale[`IMAGE.types.${x}`], value: x}))}
                       value={toJS(this.info.imageMissionTypes)}
                       onChange={this.onTypeChange}/>
      </FormItem>
      <p>{locale.cover}</p>
      <ImageUploadPanel onFileListChange={this.onCoverImageChange}
                        fileList={[this.info.coverImage].filter(x => !!x)}
                        maxFileNum={1}
                        multiple={false}
                        buttonChildren={locale.selectFile}
      />
      <FormItem valid={this.info.imagesValid} messageOnInvalid={locale["IMAGE.requireImages"]}>
        <p>{locale["IMAGE.images"]}</p>
        <ImageUploadPanel onFileListChange={this.onFileListChange}
                          fileList={this.info.images}
                          maxFileNum={Number.MAX_SAFE_INTEGER}
                          multiple={true}
                          buttonChildren={locale.selectFile}
        />
      </FormItem>
      <Button type={"primary"} onClick={this.submit} loading={this.uploading}>
        {locale.submit}
      </Button>
    </Form>;
  }
}
