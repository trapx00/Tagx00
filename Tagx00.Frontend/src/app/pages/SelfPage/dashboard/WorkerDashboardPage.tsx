import React from 'react';
import { UserStore } from "../../../stores/UserStore";
import { Inject } from "react.di";
import { WorkerService } from "../../../api/WorkerService";
import { LocaleMessage } from "../../../internationalization/components";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { Col, Row, Progress} from "antd";
import { PayService } from "../../../api/PayService";
import { LevelStore } from "../../../stores/LevelStore";
import { InstanceCyclePieChart } from "./charts/InstanceCyclePieChart";
import { WorkerMissionCyclePieChart } from "./charts/WorkerMissionCyclePieChart";
import { AvatarContainer } from "./AvatarContainer";
import { UserProfileLayout } from "./UserProfileLayout";

export class WorkerDashboardPage extends React.Component<{},{}> {
  @Inject userStore: UserStore;
  @Inject workerService: WorkerService;
  @Inject levelStore: LevelStore;
  @Inject payService: PayService;

  workerInfo = async () => {
    const info = await this.workerService.getWorkerInfo(this.userStore.user.username);
    return <div>
      <DefinitionItem prompt={"已接受任务数"} children={info.acceptedMissionCount}/>
      <DefinitionItem prompt={"进行中任务数"} children={info.inProgressMissionCount}/>
      <DefinitionItem prompt={"已提交任务数"} children={info.completedMissionCount}/>
      <DefinitionItem prompt={"已放弃任务数"} children={info.abandonedMissionCount}/>
      <DefinitionItem prompt={"已完成任务数"} children={info.finalizedMissionCount}/>
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
        <DefinitionItem prompt={"用户名"}>
          {info.username}
        </DefinitionItem>
        <DefinitionItem prompt={"注册邮箱"}>
          {info.email}
        </DefinitionItem>
        <DefinitionItem prompt={"等级"}>
          {info.level}
        </DefinitionItem>
        <DefinitionItem prompt={"积分"}>
          {credits.credits}
        </DefinitionItem>
        <DefinitionItem prompt={"经验"}
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
