import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../../../stores/UserStore";
import { RequesterService } from "../../../../api/RequesterService";
import { LocaleDate, LocaleMessage } from "../../../../internationalization/components/index";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { DefinitionItem } from "../../../../components/DefinitionItem/index";
import { Row, Col } from "antd";
import { PayService } from "../../../../api/PayService";
import { InstanceCyclePieChart } from "../charts/InstanceCyclePieChart";
import { AvatarContainer } from "../AvatarContainer";
import { UserProfileLayout } from "../UserProfileLayout";
import { ClickablePieChart } from "../charts/ClickablePieChart";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { RequesterMissionChart } from "./RequesterMissionChart";

const ID_PREFIX = "dashboard.";

interface Props {
  username: string;
}

export class RequesterDashboardPage extends React.Component<Props, {}> {
  @Inject requesterService: RequesterService;
  @Inject payService: PayService;


  nameMap = []

  requesterInfo = async () => {
    const info = await this.requesterService.getRequesterInfo(this.props.username);
    const credit = await this.payService.getCredits();




    return <div style={{maxWidth: "1000px", marginLeft: "auto", marginRight: "auto"}}>
      <UserProfileLayout avatarUrl={info.avatarUrl}>
        <div>
          <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.username"}/>}>
            {info.username}
          </DefinitionItem>
          <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "selfInfo.role"}/>}>
            <LocaleMessage id={"common.userRole.REQUESTER"}/>
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
        <RequesterMissionChart data={info}/>
      </div>

    </div>;
  };


  render() {
    return <AsyncComponent render={this.requesterInfo}/>
  }

}
