import React from 'react';
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { AdminService } from "../../../../api/AdminService";
import { Inject } from "react.di";
import { DefinitionItem } from "../../../../components/DefinitionItem/index";
import { LocaleMessage } from "../../../../internationalization/components/index";
import { MissionDateChart } from "../charts/InstanceAcceptedWithDateChart";
import { MissionCyclePieChart } from "../charts/MissionCyclePieChart";
import { InstanceCyclePieChart } from "../charts/InstanceCyclePieChart";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { observer } from "mobx-react";
import { MinorTitle } from "../../../LeaderboardPage/common";

const ID_PREFIX = "admin.";

@observer
export default class Default extends React.Component<{}, {}> {
  @Inject localeStore: LocaleStore;
  @Inject adminService: AdminService;

  renderInfo = async () => {
    const info = await this.adminService.getAdminInfo();
    return <div>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "dashboard.allUser"}/></MinorTitle>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "dashboard.userCount"}/>} children={info.userCount}/>

      <MinorTitle><LocaleMessage id={ID_PREFIX + "missionChart.name"}/></MinorTitle>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "missionChart.activeMissionCount"}/>} children={info.activeMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "missionChart.pendingMissionCount"}/>} children={info.pendingMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "missionChart.endedMissionCount"}/>} children={info.endedMissionCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "missionChart.totalMissionCount"}/>} children={info.totalMissionCount}/>
      <MissionCyclePieChart activeMissionCount={info.activeMissionCount}
                            pendingMissionCount={info.pendingMissionCount}
                            endedMissionCount={info.endedMissionCount}
                            totalMissionCount={info.totalMissionCount}/>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "instanceChart.name"}/></MinorTitle>
      
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "instanceChart.inProgressInstanceCount"}/>} children={info.inProgressInstanceCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "instanceChart.submittedInstanceCount"}/>} children={info.submittedInstanceCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "instanceChart.finalizeInstanceCount"}/>} children={info.finalizeInstanceCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "instanceChart.totalInstanceCount"}/>} children={info.totalInstanceCount}/>
      <InstanceCyclePieChart activeInstanceCount={info.inProgressInstanceCount}
                             pendingInstanceCount={info.submittedInstanceCount}
                             endedInstanceCount={info.finalizeInstanceCount}
                             totalInstanceCount={info.totalInstanceCount}/>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "dateChart.name"}/></MinorTitle>
      <MissionDateChart data={info.listOfInstanceDateNum}/>

    </div>
  }

  render() {
    return <div>
      <AsyncComponent render={this.renderInfo}/>
    </div>

  }
}
