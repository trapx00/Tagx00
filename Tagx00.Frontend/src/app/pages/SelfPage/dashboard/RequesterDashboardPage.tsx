import React from 'react';
import {Inject} from "react.di";
import {UserStore} from "../../../stores/UserStore";
import {RequesterService} from "../../../api/RequesterService";
import {LocaleMessage} from "../../../internationalization/components";
import {AsyncComponent} from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem";

export class RequesterDashboardPage extends React.Component<{},{}> {
    @Inject userStore:UserStore;
    @Inject requesterService:RequesterService;

    requesterInfo = async () => {
        const info = await this.requesterService.getRequesterInfo(this.userStore.user.username,this.userStore.token);
        return <div>
          <DefinitionItem prompt={"已发布任务"} children={info.submittedMissionCount}/>
          <DefinitionItem prompt={"实例任务数"} children={info.instanceCount}/>
          <DefinitionItem prompt={"进行中"} children={info.inProgressInstanceCount}/>
          <DefinitionItem prompt={"待评价"} children={info.awaitingCommentInstanceCount}/>
          <DefinitionItem prompt={"已完成"} children={info.finalizedInstanceCount}/>
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