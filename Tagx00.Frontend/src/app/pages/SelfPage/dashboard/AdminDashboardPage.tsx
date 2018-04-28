import React from 'react';
import { AsyncComponent } from "../../../router/AsyncComponent";
import { AdminService } from "../../../api/AdminService";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { LocaleMessage } from "../../../internationalization/components";

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
    const pieText = [InstanceProps.inProgress, InstanceProps.submitted, InstanceProps.awaitingComment, InstanceProps.finalized]
    return <div style={{textAlign: 'center'}}>
      {/*<DefinitionItem prompt={"系统用户数"} children={info.userCount}/>*/}
      <PieChart width={500} height={500} style={{"display": "inline"}}>
        <Pie isAnimationActive={false}
             data={MissionData}
             cx="30%" cy="30%"
             outerRadius={80}
             label>
          {
            InstanceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]}/>
            ))
          }
        </Pie>
      </PieChart>
      <PieChart width={500} height={500} style={{"display": "inline"}}>
        <Pie isAnimationActive={false}
             data={InstanceData}
             cx="30%" cy="30%"
             outerRadius={80}
             label>
          {
            InstanceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]}/>
            ))
          }
        </Pie>
      </PieChart>
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