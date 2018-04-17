import React from 'react';
import {AsyncComponent} from "../../../router/AsyncComponent";
import {AdminService} from "../../../api/AdminService";
import {Inject} from "react.di";
import {UserStore} from "../../../stores/UserStore";
import {PieChart, Pie, Legend, Tooltip, Cell} from "recharts";

export class AdminDashboardPage extends React.Component<{},{}> {

    @Inject adminService: AdminService;
    @Inject userStore: UserStore;

    renderInfo = async () => {
        const MissionProps = {
            pending: "selfCenter.cardState.inProgress",
            active: "selfCenter.cardState.submitted",
            ended: "loginModal.cancel",
        };
        const InstanceProps ={
            inProgress: "进行中",
            submitted:"已提交",
            awaitingComment: "待评价",
            finalized: "已完成",
        };

        const info = await this.adminService.getAdminInfo(this.userStore.token);
        const Missiondata = [
            {name: MissionProps.pending, value: info.totalMissionCount},
            {name: 'Group B', value: 4567},
           ];
        const InstanceData = [
            {name: InstanceProps.inProgress,value: info.inProgressInstanceCount},
            {name: InstanceProps.submitted,value :info.submittedInstanceCount},
            {name: InstanceProps.awaitingComment, value: 1000},
            {name: InstanceProps.finalized, value: info.finalizeInstanceCount}
            ];
        const colors = ["#99adff","#99d6ff","#9dfce9","#d6ff99"];
        const pieText = [InstanceProps.inProgress,InstanceProps.submitted,InstanceProps.awaitingComment,InstanceProps.finalized]
        return <div>
            <p>系统用户数：{info.userCount}</p>
            <p>任务：{info.totalMissionCount}</p>
            <p>实例：{info.totalInstanceCount}</p>
            <PieChart width={400} height={400}>
                <Pie isAnimationActive={false}
                    data={InstanceData}
                    cx={200} cy={140}
                    outerRadius={80}
                    label>
                    {
                        InstanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                        ))
                    }
                </Pie>
                <Tooltip/>
            </PieChart>
        </div>

    }

    render() {
        return <div>
            <h1>仪表盘</h1>
            <AsyncComponent render={this.renderInfo}/>
        </div>

    }
}