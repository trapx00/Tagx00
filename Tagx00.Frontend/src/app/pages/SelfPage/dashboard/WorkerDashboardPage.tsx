import React from 'react';
import {UserStore} from "../../../stores/UserStore";
import {Inject} from "react.di";
import {WorkerService} from "../../../api/WorkerService";
import {LocaleMessage} from "../../../internationalization/components";
import {AsyncComponent} from "../../../router/AsyncComponent";

export class WorkerDashboardPage extends React.Component<{},{}> {
    @Inject userStore:UserStore;
    @Inject workerService:WorkerService;

    workerInfo = async () => {
        const info = await this.workerService.getWorkerInfo(this.userStore.user.username,this.userStore.token);
        return <div>
            <p>已接受任务：{info.acceptedMissionCount}</p>
            <p>进行中：{info.inProgressMissionCount}</p>
            <p>已完成：{info.completedMissionCount}</p>
            <p>已放弃： {info.abandonedMissionCount }</p>
        </div>
    }

    render() {
        return (
            <div>
                <h1>
                    <LocaleMessage id={"selfCenter.dashboard"}/>
                </h1>
                <AsyncComponent render={this.workerInfo}/>
            </div>
        )
    }
}