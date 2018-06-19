import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import React from "react";
import { MissionCyclePieChart } from "../charts/mission/MissionCyclePieChart";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { observer } from "mobx-react";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { LocaleMessage } from "../../../../internationalization/components";
import { MinorTitle } from "../../../LeaderboardPage/common";
import { AdminPageLayout } from "./shared";
import { MissionState, MissionType } from "../../../../models/mission/Mission";
import { arraySum, flatten } from "../../../../../utils/Array";
import { StackedIntervalChart } from "../charts/StackedIntervalChart";
import { MissionTypeStateStackedIntervalChart } from "../charts/mission/MissionTypeStateStackedIntervalChart";


const ID_PREFIX = "admin.missionChart.";

@observer
export default class MissionChartPage extends React.Component<{}, {}> {
  @Inject adminService: AdminService;
  @Inject localeStore: LocaleStore;

  renderInfo = async () => {
    const info = (await this.adminService.getAdminInfo()).mission;

    const values = Object.keys(info.typeStateDistribution).map(x => info.typeStateDistribution[x]);

    console.log(values);

    const map = {
      [MissionState.ACTIVE]: "active",
      [MissionState.ENDED]: "ended",
      [MissionState.PENDING]: "pending"
    };


    return <div>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "stateDistribution"}/></MinorTitle>
      <MissionCyclePieChart active={flatten(values.map(x => x.active))}
                            pending={flatten(values.map(x=>x.pending))}
                            ended={flatten(values.map( x=>x.ended))}/>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "typeDistribution"}/></MinorTitle>
      <MissionTypeStateStackedIntervalChart data={info.typeStateDistribution}/>
    </div>
  };

  render() {
    return <AdminPageLayout>

      <AsyncComponent render={this.renderInfo}/>
    </AdminPageLayout>
  }
}
