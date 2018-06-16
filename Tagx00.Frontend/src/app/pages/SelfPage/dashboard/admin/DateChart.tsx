import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import React from "react";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { MissionDateChart } from "../charts/InstanceAcceptedWithDateChart";
import { observer } from "mobx-react";
import { LocaleMessage } from "../../../../internationalization/components";

const ID_PREFIX = "admin.dateChart.";

@observer
export default class DateChart extends React.Component<{}, {}> {
  @Inject adminService: AdminService;

  renderInfo = async () => {
    const info = await this.adminService.getAdminInfo();
    return <MissionDateChart data={info.listOfInstanceDateNum}/>
  }

  render() {
    return <div>
      <h2><LocaleMessage id={ID_PREFIX + "name" }/></h2>
      <br/>
      <AsyncComponent render={this.renderInfo}/>
    </div>
  }
}