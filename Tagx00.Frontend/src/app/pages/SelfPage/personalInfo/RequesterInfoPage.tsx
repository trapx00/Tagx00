import React from "react";
import {UserStore} from "../../../stores/UserStore";
import {RequesterService} from "../../../api/RequesterService";
import {Inject} from "react.di";
import {LocaleMessage} from "../../../internationalization/components";
import {AsyncComponent} from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem";

export class RequesterInfoPage extends React.Component<{},{}> {
    @Inject userStore:UserStore;
    @Inject requesterService:RequesterService;

    requesterInfo = async () => {
        const info = await this.requesterService.getRequesterInfo(this.userStore.user.username,this.userStore.token);
        return <div>
            <DefinitionItem prompt={"用户名"} children={info.username}/>
            <DefinitionItem prompt={"注册邮箱"} children={info.email}/>
            <DefinitionItem prompt={"积分"} children={"info.credits"}/>
        </div>
    }

    render() {
        return (
            <div>
                <h1>
                    <LocaleMessage id={"selfCenter.personalInfo"}/>
                </h1>
                <AsyncComponent render={this.requesterInfo}/>
            </div>
        )
    }
}