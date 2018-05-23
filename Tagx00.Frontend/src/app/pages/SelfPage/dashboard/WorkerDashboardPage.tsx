import React from 'react';
import { UserStore } from "../../../stores/UserStore";
import { Inject } from "react.di";
import { WorkerService } from "../../../api/WorkerService";
import { LocaleMessage } from "../../../internationalization/components";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem";

export class WorkerDashboardPage extends React.Component<{},{}> {
    @Inject userStore:UserStore;
    @Inject workerService:WorkerService;

    workerInfo = async () => {
        const info = await this.workerService.getWorkerInfo(this.userStore.user.username);
        return <div>
            <DefinitionItem prompt={"已接受任务"} children={info.acceptedMissionCount}/>
            <DefinitionItem prompt={"进行中"} children={info.inProgressMissionCount}/>
            <DefinitionItem prompt={"已提交"} children={info.completedMissionCount}/>
            <DefinitionItem prompt={"已放弃"} children={info.abandonedMissionCount}/>
          <DefinitionItem prompt={"已完成"} children={info.finalizedMissionCount}/>
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
