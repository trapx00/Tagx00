import React from 'react';
import { AsyncComponent } from "../../../router/AsyncComponent";
import { AdminService } from "../../../api/AdminService";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { LocaleMessage } from "../../../internationalization/components";
import { MissionDateChart } from "./charts/InstanceAcceptedWithDateChart";
import { MissionCyclePieChart } from "./charts/MissionCyclePieChart";
import { InstanceCyclePieChart } from "./charts/InstanceCyclePieChart";


export class AdminDashboardPage extends React.Component<{}, {}> {

  @Inject adminService: AdminService;

  renderInfo = async () => {
    const MissionProps = {
      pending: "selfCenter.cardState.inProgress",
      active: "selfCenter.cardState.submitted",
      ended: "loginModal.cancel",
    };
    const InstanceProps = {
      inProgress: "进行中",
      submitted: "已提交",
      awaitingComment: "待评价",
      finalized: "已完成",
    };

    // //
    // activeInstanceCount: number;
    // endedInstanceCount: number;
    // pendingInstanceCount: number;
    // userCount: number;
    // totalInstanceCount: number;
    // totalInstanceCount: number;
    // inProgressInstanceCount: number;
    // submittedInstanceCount: number;
    // finalizeInstanceCount: number;
    // //

    const info = await this.adminService.getAdminInfo();


    const colors = ["#39fc59", "#68ff41", "#4371ff", "#d6ff99"];
    const pieText = [InstanceProps.inProgress, InstanceProps.submitted, InstanceProps.awaitingComment, InstanceProps.finalized];

    return <div>
      <DefinitionItem prompt={"系统用户数"} children={info.userCount}/>
      <DefinitionItem prompt={"可接受任务数"} children={info.activeMissionCount}/>
      <DefinitionItem prompt={"未到时间任务数"} children={info.pendingMissionCount}/>
      <DefinitionItem prompt={"结束任务数"} children={info.endedMissionCount}/>
      <DefinitionItem prompt={"总任务数"} children={info.totalMissionCount}/>
      <MissionCyclePieChart activeMissionCount={info.activeMissionCount} pendingMissionCount={info.pendingMissionCount} endedMissionCount={info.endedMissionCount} totalMissionCount={info.totalMissionCount}/>
      <DefinitionItem prompt={"正在进行实例数"} children={info.inProgressInstanceCount}/>
      <DefinitionItem prompt={"已提交实例数"} children={info.submittedInstanceCount}/>
      <DefinitionItem prompt={"已结束实例数"} children={info.finalizeInstanceCount}/>
      <DefinitionItem prompt={"总实例数"} children={info.totalInstanceCount}/>
      <InstanceCyclePieChart activeInstanceCount={info.inProgressInstanceCount} pendingInstanceCount={info.submittedInstanceCount} endedInstanceCount={info.finalizeInstanceCount} totalInstanceCount={info.totalInstanceCount}/>
      <p>任务实例接受和日期折线图</p>
      <MissionDateChart data={info.listOfInstanceDateNum}/>

    </div>

  }

  render() {
    return <div>
      <h1>
        <LocaleMessage id={"selfCenter.dashboard"}/>
      </h1>
      <AsyncComponent render={this.renderInfo}/>
    </div>

  }
}
