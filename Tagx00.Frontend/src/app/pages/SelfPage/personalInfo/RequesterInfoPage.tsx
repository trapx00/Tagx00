import React from "react";
import {UserStore} from "../../../stores/UserStore";
import {RequesterService} from "../../../api/RequesterService";
import {Inject} from "react.di";
import {LocaleMessage} from "../../../internationalization/components";
import {AsyncComponent} from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { LeaderboardService } from "../../../api/LeaderboardService";
import { PayService } from "../../../api/PayService";

export class RequesterInfoPage extends React.Component<{},{}> {
    @Inject userStore:UserStore;
    @Inject requesterService:RequesterService;
    @Inject payService: PayService;

    requesterInfo = async () => {
        const info = await this.requesterService.getRequesterInfo(this.userStore.user.username,this.userStore.token);
        const credit = await this.payService.getCredits(this.userStore.token);
        return <div>
            <DefinitionItem prompt={"用户名"}>
              {info.username}
            </DefinitionItem>
            <DefinitionItem prompt={"注册邮箱"}>
              {info.email}
            </DefinitionItem>
            <DefinitionItem prompt={"积分"}>
              {credit.credits}
            </DefinitionItem>
        </div>
    };

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
