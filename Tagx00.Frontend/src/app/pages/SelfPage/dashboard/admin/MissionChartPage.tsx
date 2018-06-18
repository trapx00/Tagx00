import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import React from "react";
import { DefinitionItem } from "../../../../components/DefinitionItem/index";
import { MissionCyclePieChart } from "../charts/MissionCyclePieChart";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { observer } from "mobx-react";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { LocaleMessage } from "../../../../internationalization/components";
import { MinorTitle } from "../../../LeaderboardPage/common";
import { AdminPageLayout } from "./shared";
import { MissionTipCard } from "../../../../components/Mission/MissionTipCard";
import { MissionState, MissionType } from "../../../../models/mission/Mission";
import { arraySum } from "../../../../../utils/Array";
import { StackedIntervalChart } from "../charts/StackedIntervalChart";


const ID_PREFIX = "admin.missionChart.";

@observer
export default class MissionChartPage extends React.Component<{}, {}> {
  @Inject adminService: AdminService;
  @Inject localeStore: LocaleStore;

  renderInfo = async () => {
    const info = (await this.adminService.getAdminInfo()).mission;

    const values = Object.keys(info.typeStateDistribution).map(x => info.typeStateDistribution[x]);


    const map = {
      [MissionState.ACTIVE]: "active",
      [MissionState.ENDED]: "ended",
      [MissionState.PENDING]: "pending"
    };

    // handle data
    const data = Object.keys(MissionState).map(x => {
      const data = {} as any;
      for (const type of Object.keys(MissionType)) {
        data[this.localeStore.get(`common.missionType.${type}`) as string] = info.typeStateDistribution[type][map[x]];
      }
      return { name: this.localeStore.get(ID_PREFIX+"missionState."+x) as string, data};
    });

    return <div>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "stateDistribution"}/></MinorTitle>
      <MissionCyclePieChart activeMissionCount={arraySum(values, x=>x.active)}
                            pendingMissionCount={arraySum(values, x=>x.pending)}
                            endedMissionCount={arraySum(values, x=>x.ended)}/>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "typeDistribution"}/></MinorTitle>
      <StackedIntervalChart data={data}/>
    </div>
  };

  render() {
    return <AdminPageLayout>

      <AsyncComponent render={this.renderInfo}/>
    </AdminPageLayout>
  }
}
