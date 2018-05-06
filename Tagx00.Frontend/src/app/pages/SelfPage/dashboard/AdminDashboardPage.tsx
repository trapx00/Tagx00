import React from 'react';
import { AsyncComponent } from "../../../router/AsyncComponent";
import { AdminService } from "../../../api/AdminService";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { LocaleMessage } from "../../../internationalization/components";
import { MissionDateChart } from "./charts/InstanceAcceptedWithDateChart";


export class AdminDashboardPage extends React.Component<{}, {}> {

  @Inject adminService: AdminService;
  @Inject userStore: UserStore;

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
    // activeMissionCount: number;
    // endedMissionCount: number;
    // pendingMissionCount: number;
    // userCount: number;
    // totalMissionCount: number;
    // totalInstanceCount: number;
    // inProgressInstanceCount: number;
    // submittedInstanceCount: number;
    // finalizeInstanceCount: number;
    // //

    const info = await this.adminService.getAdminInfo(this.userStore.token);
    const MissionData = [
      {name: MissionProps.pending, value: info.pendingMissionCount},
      {name: MissionProps.active, value: info.activeMissionCount},
      {name: MissionProps.ended, value: info.endedMissionCount}
    ];
    const InstanceData = [
      {name: InstanceProps.inProgress, value: info.inProgressInstanceCount},
      {name: InstanceProps.submitted, value: info.submittedInstanceCount},
      {name: InstanceProps.finalized, value: info.finalizeInstanceCount}
    ];
    const colors = ["#39fc59", "#68ff41", "#4371ff", "#d6ff99"];
    const pieText = [InstanceProps.inProgress, InstanceProps.submitted, InstanceProps.awaitingComment, InstanceProps.finalized];


    return <div>
      <DefinitionItem prompt={"系统用户数"} children={info.userCount}/>
      <DefinitionItem prompt={"可接受任务数"} children={info.activeMissionCount}/>
      <DefinitionItem prompt={"未到时间任务数"} children={info.pendingMissionCount}/>
      <DefinitionItem prompt={"结束任务数"} children={info.endedMissionCount}/>
      <DefinitionItem prompt={"总任务数"} children={info.totalMissionCount}/>
      <DefinitionItem prompt={"正在进行实例数"} children={info.inProgressInstanceCount}/>
      <DefinitionItem prompt={"已提交实例数"} children={info.submittedInstanceCount}/>
      <DefinitionItem prompt={"已结束实例数"} children={info.finalizeInstanceCount}/>
      {/*<p>任务实例接受和日期折线图</p>*/}
      {/*<MissionDateChart data={info.listOfInstanceDateNum}/>*/}

      {/*<PieChart width={500} height={500} style={{"display": "inline"}}>*/}
        {/*<Pie isAnimationActive={false}*/}
             {/*data={MissionData}*/}
             {/*dataKey="value"*/}
             {/*cx="30%" cy="30%"*/}
             {/*outerRadius={80}*/}
             {/*label>*/}
          {/*{*/}
            {/*InstanceData.map((entry, index) => (*/}
              {/*<Cell key={`cell-${index}`} fill={colors[index]}/>*/}
            {/*))*/}
          {/*}*/}
        {/*</Pie>*/}
      {/*</PieChart>*/}
      {/*<PieChart width={500} height={500} style={{"display": "inline"}}>*/}
        {/*<Pie isAnimationActive={false}*/}
             {/*data={InstanceData}*/}
             {/*dataKey="value"*/}
             {/*cx="30%" cy="30%"*/}
             {/*outerRadius={80}*/}
             {/*label>*/}
          {/*{*/}
            {/*InstanceData.map((entry, index) => (*/}
              {/*<Cell key={`cell-${index}`} fill={colors[index]}/>*/}
            {/*))*/}
          {/*}*/}
        {/*</Pie>*/}
      {/*</PieChart>*/}
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
