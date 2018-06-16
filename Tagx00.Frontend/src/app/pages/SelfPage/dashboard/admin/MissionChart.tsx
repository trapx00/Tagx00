import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import React from "react";
import { DefinitionItem } from "../../../../components/DefinitionItem/index";
import { MissionCyclePieChart } from "../charts/MissionCyclePieChart";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { observer } from "mobx-react";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { LocaleMessage } from "../../../../internationalization/components";


const ID_PREFIX = "admin.missionChart";

@observer
export class Mission extends React.Component<{}, {}> {
  @Inject adminService: AdminService;
  @Inject localeStore: LocaleStore;

  renderInfo = async () => {
    const missionChart: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}.${key as string}`) as string;
      }
    });
    const info = await this.adminService.getAdminInfo();
    return <div>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "activeMissionCount"}/>} children={info.activeMissionCount}/>
      <DefinitionItem prompt={"未到时间任务数"} children={info.pendingMissionCount}/>
      <DefinitionItem prompt={"结束任务数"} children={info.endedMissionCount}/>
      <DefinitionItem prompt={"总任务数"} children={info.totalMissionCount}/>
      <MissionCyclePieChart activeMissionCount={info.activeMissionCount}
                            pendingMissionCount={info.pendingMissionCount}
                            endedMissionCount={info.endedMissionCount}
                            totalMissionCount={info.totalMissionCount}/>
    </div>
  }

  render() {
    return <AsyncComponent render={this.renderInfo}/>
  }
}