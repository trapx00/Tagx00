import React from "react";
import {Inject} from "react.di";
import {LocaleMessage} from "../../internationalization/components";
import {UserStore} from "../../stores/UserStore";
import {RequesterService} from "../../api/RequesterService";
import {WorkerService} from "../../api/WorkerService";
import {UserRole} from "../../models/User";
import {AsyncComponent} from "../../router/AsyncComponent";
import Col from "antd/es/grid/col";
import {AdminService} from "../../api/AdminService";

export class DashboardPage extends React.Component<any, any> {

    @Inject userStore: UserStore;
    @Inject workerService: WorkerService;
    @Inject requesterService: RequesterService;
    @Inject adminService: AdminService;

    //state

    getWorkerInfo = async () => {
        const instances = await this.workerService.getWorkerInfo(this.userStore.user.username,this.userStore.token);
        return instances.exp;
    };

    getRequesterInfo = async () => {
        const instances = await this.requesterService.getRequesterInfo(this.userStore.user.username,this.userStore.token);
        return instances.instanceCount;
    };

    getAdminInfo = async () => {
        const instances = await this.adminService.getAdminInfo(this.userStore.token);
        return instances.userCount;
    };

    render() {
        const { username, email, role } = this.userStore.user;
        switch(role) {
            case UserRole.ROLE_WORKER:
                return (
                    <Col xs={12} md={9}>
                        <div>
                            <h1>
                                <LocaleMessage id={"selfCenter.dashboard"}/>
                            </h1>
                            <p>用户名: {username}{this.props} </p>
                            <p>邮箱: {email} </p>
                            <p>经验: <AsyncComponent render={this.getWorkerInfo}/> </p>
                            <p>积分: </p>
                        </div>
                    </Col>);
            case UserRole.ROLE_REQUESTER:
                return (
                    <div>
                        <h1>
                            <LocaleMessage id={"selfCenter.dashboard"}/>
                        </h1>
                        <p>用户名: {username} </p>
                        <p>邮箱: {email} </p>
                        <p>总发布任务数: <AsyncComponent render={this.getRequesterInfo}/></p>
                        <p>进行中:</p>
                        <p>已完成:</p>
                    </div>);
            case UserRole.ROLE_ADMIN:
                return (
                    <div>
                        <h1>
                            <LocaleMessage id={"selfCenter.dashboard"}/>
                        </h1>
                        <p>系统用户数: <AsyncComponent render={this.getAdminInfo}/></p>
                        <p>任务数:</p>
                        <p>进行中:</p>
                        <p>已完成:</p>
                    </div>);
            default:
                return null;
        }

  }
}
