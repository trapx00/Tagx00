import { LocaleStore } from "../../../../../stores/LocaleStore";
import { UploadStage } from "../MissionCreateInfoForm";
import { observer } from "mobx-react";
import { RequesterService } from "../../../../../api/RequesterService";
import { Inject } from "react.di";
import { PayService } from "../../../../../api/PayService";
import React from "react";
import { UserStore } from "../../../../../stores/UserStore";
import { RouterStore } from "../../../../../stores/RouterStore";
import { observable } from "mobx";
import { TopicService } from "../../../../../api/TopicService";
import { ThreeDimensionMissionCreateInfo } from "./3dMissionCreateInfo";

interface Props {

}

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
}