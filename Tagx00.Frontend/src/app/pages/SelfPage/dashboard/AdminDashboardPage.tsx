import React from 'react';
import {AsyncComponent} from "../../../router/AsyncComponent";
import {AdminService} from "../../../api/AdminService";
import {Inject} from "react.di";
import {UserStore} from "../../../stores/UserStore";

export class AdminDashboardPage extends React.Component<{},{}> {

    @Inject adminService: AdminService;
    @Inject userStore: UserStore;

    constructor(props) {
        super(props);
        this.state={
            userCount: 0,
            totalMissionCount: 0,
            //pendingMissionCount:0,
            //activeMissionCount:0,
            //endedMissionCount:0,
            totalInstanceCount: 0,
            inProgressInstanceCount: 0,
            submittedInstanceCount: 0,
            finalizeInstanceCount: 0,
        }
    }

    renderInfo = async () => {
        const info = await this.adminService.getAdminInfo(this.userStore.token);
        return <div>
            <p>系统用户数：{info.userCount}</p>
            <p>任务：{info.totalMissionCount}</p>
            <p>实例：{info.totalInstanceCount}</p>
        </div>

    }

    render() {
        return <div>
            <h1>仪表盘</h1>
            <AsyncComponent render={this.renderInfo}/>
        </div>

    }
}