import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { RequesterService } from "../../../api/RequesterService";
import { LocaleMessage } from "../../../internationalization/components";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { Row, Col } from "antd";
import { PayService } from "../../../api/PayService";
import { InstanceCyclePieChart } from "./charts/InstanceCyclePieChart";
import { AvatarContainer } from "./AvatarContainer";
import { UserProfileLayout } from "./UserProfileLayout";

const ID_PREFIX = "dashboard.";

export class RequesterDashboardPage extends React.Component<{},{}> {
    @Inject userStore:UserStore;
    @Inject requesterService:RequesterService;
    @Inject payService: PayService;

  requesterInfo = async () => {
    const info = await this.requesterService.getRequesterInfo(this.userStore.user.username);
    console.log(info);
    const total = info.finalizedInstanceCount+info.inProgressInstanceCount+info.awaitingCommentInstanceCount;
    return <div>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.submittedMissionCount"}/>} children={info.submittedMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.instanceCount"}/>} children={info.instanceCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.inProgressInstanceCount"}/>} children={info.inProgressInstanceCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.awaitingCommentInstanceCount"}/>} children={info.awaitingCommentInstanceCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.finalizedInstanceCount"}/>} children={info.finalizedInstanceCount}/>
      <InstanceCyclePieChart activeInstanceCount={info.inProgressInstanceCount} pendingInstanceCount={info.awaitingCommentInstanceCount} endedInstanceCount={info.finalizedInstanceCount} totalInstanceCount={total}/>
    </div>
  }

  registerInfo = async () => {
    const info = await this.requesterService.getRequesterInfo(this.userStore.user.username);
    const credit = await this.payService.getCredits();
    return <div>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.username"}/>}>
        {info.username}
      </DefinitionItem>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.email"}/>}>
        {info.email}
      </DefinitionItem>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.credits"}/>}>
        {credit.credits}
      </DefinitionItem>
    </div>
  };
    render() {
        return (
            <div style={{maxWidth: "1000px", marginLeft: "auto", marginRight: "auto"}}>
              <UserProfileLayout avatarUrl={this.userStore.user.avatarUrl}>
                <AsyncComponent render={this.registerInfo}/>
              </UserProfileLayout>
              <br/>
              <br/>
              <h2>
                <LocaleMessage id={"selfCenter.dashboard"}/>
              </h2>
              <br/>
              <AsyncComponent render={this.requesterInfo}/>

            </div>
        )
    }
    
}
