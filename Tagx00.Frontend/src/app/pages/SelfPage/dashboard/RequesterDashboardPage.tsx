import React from 'react';
import {Inject} from "react.di";
import {UserStore} from "../../../stores/UserStore";
import {RequesterService} from "../../../api/RequesterService";
import {LocaleMessage} from "../../../internationalization/components";
import {AsyncComponent} from "../../../router/AsyncComponent";

export class RequesterDashboardPage extends React.Component<{},{}> {
    @Inject userStore:UserStore;
    @Inject requesterService:RequesterService;

    requesterInfo = async () => {
        const info = await this.requesterService.getRequesterInfo(this.userStore.user.username,this.userStore.token);
        return <div>
            <p>已发布任务：{info.submittedMissionCount}</p>
            <p>实例任务数：{info.instanceCount}</p>
            <p>进行中：{info.inProgressInstanceCount}</p>
            <p>待评价：{info.awaitingCommentInstanceCount}</p>
            <p>已完成：{info.finalizedInstanceCount}</p>
        </div>
    }
    
    render() {
        return (
            <div>
                <h1>
                    <LocaleMessage id={"selfCenter.dashboard"}/>
                </h1>
                <AsyncComponent render={this.requesterInfo}/>
            </div>
        )
    }
    
}