import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import React from "react";
import { DefinitionItem } from "../../../../components/DefinitionItem/index";
import { LocaleMessage } from "../../../../internationalization/components/index";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { InstanceCyclePieChart } from "../charts/InstanceCyclePieChart";
import { observer } from "mobx-react";
import { LocaleStore } from "../../../../stores/LocaleStore";

const ID_PREFIX = "admin.instanceChart";

@observer
export class Instance extends React.Component<{}, {}> {
  @Inject adminService: AdminService;
  @Inject localeStore: LocaleStore;

  renderInfo = async () => {
    const instanceChart: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}fields.${key as string}`) as string;
      }
    });

    const info = await this.adminService.getAdminInfo();
    return <div>
      <DefinitionItem prompt={"正在进行实例数"} children={info.inProgressInstanceCount}/>
      <DefinitionItem prompt={"已提交实例数"} children={info.submittedInstanceCount}/>
      <DefinitionItem prompt={"已结束实例数"} children={info.finalizeInstanceCount}/>
      <DefinitionItem prompt={"总实例数"} children={info.totalInstanceCount}/>
      <InstanceCyclePieChart activeInstanceCount={info.inProgressInstanceCount}
                             pendingInstanceCount={info.submittedInstanceCount}
                             endedInstanceCount={info.finalizeInstanceCount}
                             totalInstanceCount={info.totalInstanceCount}/>
    </div>
  }

  render() {
    return <AsyncComponent render={this.renderInfo}/>
  }
}