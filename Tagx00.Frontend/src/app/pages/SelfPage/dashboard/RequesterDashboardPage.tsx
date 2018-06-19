import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { RequesterService } from "../../../api/RequesterService";
import { LocaleDate, LocaleMessage } from "../../../internationalization/components";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { Row, Col } from "antd";
import { PayService } from "../../../api/PayService";
import { InstanceCyclePieChart } from "./charts/InstanceCyclePieChart";
import { AvatarContainer } from "./AvatarContainer";
import { UserProfileLayout } from "./UserProfileLayout";

const ID_PREFIX = "dashboard.";

interface Props {
  username: string;
}

export class RequesterDashboardPage extends React.Component<Props, {}> {
  @Inject requesterService: RequesterService;
  @Inject payService: PayService;

  requesterInfo = async () => {
    const info = await this.requesterService.getRequesterInfo(this.props.username);
    const credit = await this.payService.getCredits();

    return <div style={{maxWidth: "1000px", marginLeft: "auto", marginRight: "auto"}}>
      <UserProfileLayout avatarUrl={info.avatarUrl}>
        <div>
          <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.username"}/>}>
            {info.username}
          </DefinitionItem>
          <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.email"}/>}>
            {info.email}
          </DefinitionItem>
          <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.registerDate"}/>}>
            <LocaleDate formatId={ID_PREFIX + "selfInfo.registerDateFormat"} input={info.registerDate}/>
          </DefinitionItem>
          <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.credits"}/>}>
            {credit.credits}
          </DefinitionItem>
        </div>
      </UserProfileLayout>
      <br/>
      <br/>
      <h2>
        <LocaleMessage id={"selfCenter.dashboard"}/>
      </h2>
      <br/>
      <div>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.submittedMissionCount"}/>}
                        children={info.submittedMissionCount}/>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.instanceCount"}/>}
                        children={info.instanceCount}/>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.inProgressInstanceCount"}/>}
                        children={info.inProgressInstanceCount}/>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.awaitingCommentInstanceCount"}/>}
                        children={info.submittedInstanceCount}/>
        <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "requester.finalizedInstanceCount"}/>}
                        children={info.finalizedInstanceCount}/>
        <InstanceCyclePieChart
          inProgress={info.inProgressInstanceCount}
          submitted={info.submittedMissionCount}
          finalized={info.finalizedInstanceCount}
          abandoned={info.abandonedInstanceCount}/>
      </div>

    </div>;
  };


  render() {
    return <AsyncComponent render={this.requesterInfo}/>
  }

}
