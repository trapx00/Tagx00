import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import React from "react";
import { DefinitionItem } from "../../../../components/DefinitionItem/index";
import { LocaleMessage } from "../../../../internationalization/components/index";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { InstanceCyclePieChart } from "../charts/InstanceCyclePieChart";
import { observer } from "mobx-react";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { MinorTitle } from "../../../LeaderboardPage/common";

const ID_PREFIX = "admin.instanceChart.";

@observer
export default class InstanceChart extends React.Component<{}, {}> {
  @Inject adminService: AdminService;
  @Inject localeStore: LocaleStore;

  renderInfo = async () => {
    const info = await this.adminService.getAdminInfo();
    return <div>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "inProgressInstanceCount"}/>} children={info.inProgressInstanceCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "submittedInstanceCount"}/>} children={info.submittedInstanceCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "finalizeInstanceCount"}/>} children={info.finalizeInstanceCount}/>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "totalInstanceCount"}/>} children={info.totalInstanceCount}/>
      <InstanceCyclePieChart activeInstanceCount={info.inProgressInstanceCount}
                             pendingInstanceCount={info.submittedInstanceCount}
                             endedInstanceCount={info.finalizeInstanceCount}
                             totalInstanceCount={info.totalInstanceCount}/>
    </div>
  }

  render() {
    return <div>
      <MinorTitle><LocaleMessage id={ID_PREFIX + "name"}/></MinorTitle>
      <AsyncComponent render={this.renderInfo}/>
    </div>
  }
}