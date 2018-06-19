import React from 'react';
import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import { PieChart } from "../charts/PieChart";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { MinorTitle } from "../../../LeaderboardPage/common";
import { LocaleMessage } from "../../../../internationalization/components";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { UserRegisterChart } from "../charts/UserRegisterChart";
import { UserPieChart } from "../charts/UserPieChart";
import { UserTable } from "./UserTable";

interface Props {

}

const ID_PREFIX= "admin.userChart.";

export default class UserChartPage extends React.Component<Props, {}> {

  @Inject adminService: AdminService;

  @Inject localeStore: LocaleStore;

  renderContent = async () => {
    const info = (await this.adminService.getAdminInfo()).user;

    return <div>
      <MinorTitle><LocaleMessage id={ID_PREFIX+"name"}/></MinorTitle>
      <UserTable/>
      <UserPieChart requesters={info.requesters} workers={info.workers}/>
      <MinorTitle><LocaleMessage id={ID_PREFIX+"registerDateCountChart"}/></MinorTitle>
      <UserRegisterChart data={Object.keys(info.registerDateDistribution).map(x => ({date: x, count: info.registerDateDistribution[x].length}))}/>
    </div>
  };

  render() {
    return <AsyncComponent render={this.renderContent}/>
  }
}
