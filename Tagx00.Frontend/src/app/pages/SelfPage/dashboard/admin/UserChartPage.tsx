import React from 'react';
import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import { PieChart } from "../charts/PieChart";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { MinorTitle } from "../../../LeaderboardPage/common";
import { LocaleMessage } from "../../../../internationalization/components";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { UserRegisterChart } from "../charts/UserRegisterChart";

interface Props {

}

const ID_PREFIX= "admin.userChart.";

export default class UserChartPage extends React.Component<Props, {}> {

  @Inject adminService: AdminService;

  @Inject localeStore: LocaleStore;

  renderContent = async () => {
    const info = (await this.adminService.getAdminInfo()).user;

    const get = (id: string) => this.localeStore.get(ID_PREFIX+id) as string;

    return <div>
      <MinorTitle><LocaleMessage id={ID_PREFIX+"name"}/></MinorTitle>
      <PieChart title={get("total") as string}
                items={[
                  {
                    name: get("requester"),
                    count: info.requesterCount
                  },
                  {
                    name: get("worker"),
                    count: info.workerCount
                  }
                ]}

      />
      <MinorTitle><LocaleMessage id={ID_PREFIX+"registerDateCountChart"}/></MinorTitle>
      <UserRegisterChart data={Object.keys(info.registerDateDistribution).map(x => ({date: x, count: info.registerDateDistribution[x]}))}/>
    </div>
  };

  render() {
    return <AsyncComponent render={this.renderContent}/>
  }
}
