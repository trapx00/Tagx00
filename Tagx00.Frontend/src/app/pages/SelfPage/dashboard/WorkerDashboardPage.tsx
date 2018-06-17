import React from 'react';
import { UserStore } from "../../../stores/UserStore";
import { Inject } from "react.di";
import { WorkerService } from "../../../api/WorkerService";
import { LocaleDate, LocaleMessage } from "../../../internationalization/components";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { Col, Row, Progress} from "antd";
import { PayService } from "../../../api/PayService";
import { LevelStore } from "../../../stores/LevelStore";
import { InstanceCyclePieChart } from "./charts/InstanceCyclePieChart";
import { WorkerMissionCyclePieChart } from "./charts/WorkerMissionCyclePieChart";
import { AvatarContainer } from "./AvatarContainer";
import { UserProfileLayout } from "./UserProfileLayout";

const ID_PREFIX = "dashboard.";

export class WorkerDashboardPage extends React.Component<{},{}> {
  @Inject userStore: UserStore;
  @Inject workerService: WorkerService;
  @Inject levelStore: LevelStore;
  @Inject payService: PayService;

  workerInfo = async () => {
    const info = await this.workerService.getWorkerInfo(this.userStore.user.username);
    return <div>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "worker.acceptedMissionCount"}/>} children={info.acceptedMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "worker.inProgressMissionCount"}/>} children={info.inProgressMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "worker.completedMissionCount"}/>} children={info.completedMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "worker.abandonedMissionCount"}/>} children={info.abandonedMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "worker.finalizedMissionCount"}/>} children={info.finalizedMissionCount}/>
      <WorkerMissionCyclePieChart acceptMissionCount={info.acceptedMissionCount} inProgressMissionCount={info.inProgressMissionCount} completedMissionCount={info.completedMissionCount} abandonedMissionCount={info.abandonedMissionCount} finalizedMissionCount={info.finalizedMissionCount}/>
    </div>
  }

  registerInfo = async () => {
    const info = await this.workerService.getWorkerInfo(this.userStore.user.username);
    const credits = await this.payService.getCredits();
    const nextLevelExp = await this.levelStore.getNextLevelExp(info.exp);
    const percent = (info.exp) * 100 / nextLevelExp;
    return (
      <div>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.username"}/>}>
          {info.username}
        </DefinitionItem>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.email"}/>}>
          {info.email}
        </DefinitionItem>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.registerDate"}/>}>
          <LocaleDate formatId={ID_PREFIX + "selfInfo.registerDateFormat"} input={this.userStore.user.registerDate}/>
        </DefinitionItem>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.level"}/>}>
          {info.level}
        </DefinitionItem>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.credits"}/>}>
          {credits.credits}
        </DefinitionItem>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.exp"}/>}
                        children={
                          <div style={{width: 200}}>
                            <Progress percent={percent} format={() => info.exp + "/" + nextLevelExp}/>
                          </div>}/>

      </div>);
  }


    render() {
        return <div style={{maxWidth: "1000px", marginLeft: "auto", marginRight: "auto"}}>
          <UserProfileLayout avatarUrl={this.userStore.user.avatarUrl}>
            <AsyncComponent render={this.registerInfo}/>
          </UserProfileLayout>
          <br/>
          <br/>
          <h2>
            <LocaleMessage id={"selfCenter.dashboard"}/>
          </h2>
          <br/>
          <AsyncComponent render={this.workerInfo}/>
        </div>
    }
}
