import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import React from "react";
import { DefinitionItem } from "../../../../components/DefinitionItem/index";
import { MissionCyclePieChart } from "../charts/MissionCyclePieChart";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { observer } from "mobx-react";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { LocaleMessage } from "../../../../internationalization/components";


const ID_PREFIX = "admin.missionChart.";

@observer
export default class MissionChart extends React.Component<{}, {}> {
  @Inject adminService: AdminService;
  @Inject localeStore: LocaleStore;

  renderInfo = async () => {
    const info = await this.adminService.getAdminInfo();
    return <div>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "activeMissionCount"}/>} children={info.activeMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "pendingMissionCount"}/>} children={info.pendingMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "endedMissionCount"}/>} children={info.endedMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "totalMissionCount"}/>} children={info.totalMissionCount}/>
      <MissionCyclePieChart activeMissionCount={info.activeMissionCount}
                            pendingMissionCount={info.pendingMissionCount}
                            endedMissionCount={info.endedMissionCount}
                            totalMissionCount={info.totalMissionCount}/>
    </div>
  }

  render() {
    return <div>
      <h2><LocaleMessage id={ID_PREFIX + "name"}/></h2>
      <br/>
      <AsyncComponent render={this.renderInfo}/>
    </div>
  }
}