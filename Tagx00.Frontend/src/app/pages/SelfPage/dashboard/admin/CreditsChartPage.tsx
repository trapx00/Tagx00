import React from 'react';
import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { MinorTitle } from "../../../LeaderboardPage/common";
import { LocaleMessage } from "../../../../internationalization/components";
import { PieChart } from "../charts/PieChart";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { MissionTypeCreditChart } from "../charts/MissionTypeCreditChart";

interface Props {

}

const ID_PREFIX= "admin.creditsChart.";

export default class CreditsChartPage extends React.Component<Props, {}> {
  @Inject adminService: AdminService;

  @Inject localeStore: LocaleStore;

  renderContent = async () => {
    const info = (await this.adminService.getAdminInfo()).credit;

    console.log(info.typeDistribution);

    const get = (id: string) => this.localeStore.get(ID_PREFIX+id) as string;

    return <div>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "name"}/></MinorTitle>
      <PieChart title={get("total") as string}
                items={[
                  {
                    name: get("requester"),
                    count: info.requesterCredits
                  },
                  {
                    name: get("worker"),
                    count: info.workerCredits
                  },
                  {
                    name: get("mission"),
                    count: info.missionCredits
                  }
                ]}

      />
      <MinorTitle><LocaleMessage id={ID_PREFIX + "typeCreditDistribution"}/></MinorTitle>
      <MissionTypeCreditChart data={Object.keys(info.typeDistribution).map(x => ({type: this.localeStore.get("common.missionType."+x) as string, ...info.typeDistribution[x]}))}/>


    </div>
  };

  render() {
    return <AsyncComponent render={this.renderContent}/>
  }
}
