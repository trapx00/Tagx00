import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import React from "react";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { MissionDateChart } from "../charts/InstanceAcceptedWithDateChart";
import { observer } from "mobx-react";

@observer
export class Date extends React.Component<{}, {}> {
  @Inject adminService: AdminService;

  renderInfo = async () => {
    const info = await this.adminService.getAdminInfo();
    return <MissionDateChart data={info.listOfInstanceDateNum}/>
  }

  render() {
    return <AsyncComponent render={this.renderInfo}/>
  }
}