import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import React from "react";
import { LocaleMessage } from "../../../../internationalization/components/index";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { InstanceCyclePieChart } from "../charts/InstanceCyclePieChart";
import { observer } from "mobx-react";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { MinorTitle } from "../../../LeaderboardPage/common";
import { InstanceHeatMap } from "../charts/InstanceHeatMap";
import { AdminPageLayout } from "./shared";
import { arraySum } from "../../../../../utils/Array";
import { MissionState, MissionType } from "../../../../models/mission/Mission";
import { StackedIntervalChart } from "../charts/StackedIntervalChart";
import { MissionInstanceState } from "../../../../models/instance/MissionInstanceState";

const ID_PREFIX = "admin.instanceChart.";

@observer
export default class InstanceChartPage extends React.Component<{}, {}> {
  @Inject adminService: AdminService;
  @Inject localeStore: LocaleStore;

  renderInfo = async () => {
    const info = (await this.adminService.getAdminInfo()).instance;

    const values = Object.keys(info.typeStateDistribution).map(x => info.typeStateDistribution[x]);


    const map = {
      [MissionInstanceState.IN_PROGRESS]: "inProgress",
      [MissionInstanceState.SUBMITTED]: "submitted",
      [MissionInstanceState.FINALIZED]: "finalized",
      [MissionInstanceState.ABANDONED]: "abandoned"
    };

    console.log(info.typeStateDistribution);
    // handle data
    const data = Object.keys(MissionInstanceState).map(x => {
      const data = {} as any;
      for (const type of Object.keys(MissionType)) {
        data[this.localeStore.get(`common.missionType.${type}`) as string] = info.typeStateDistribution[type][map[x]].length;
      }
      return { name: this.localeStore.get(ID_PREFIX+"instanceState."+x) as string, data};
    });

    return <div>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "stateDistribution"}/></MinorTitle>
      <InstanceCyclePieChart inProgress={arraySum(values, x=>x.inProgress.length)}
                             submitted={arraySum(values, x=>x.submitted.length)}
                             finalized={arraySum(values, x=> x.finalized.length)}
                             abandoned={arraySum(values, x=>x.abandoned.length)}/>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "typeDistribution"}/></MinorTitle>
      <StackedIntervalChart data={data}/>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "heatMap"}/></MinorTitle>
      <InstanceHeatMap data={info.acceptDateDistribution}/>

    </div>
  };

  render() {
    return <AdminPageLayout>
      <AsyncComponent render={this.renderInfo}/>
    </AdminPageLayout>
  }
}
