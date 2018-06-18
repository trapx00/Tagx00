import React from 'react';
import { UserStore } from "../../../../stores/UserStore";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { LocaleMessage } from "../../../../internationalization/components";
import { Redirect, Switch } from "react-router";
import { AsyncRoute } from "../../../../router/AsyncRoute";
import ChartTypeMenu from "./ChartTypeMenu";
import { AdminService } from "../../../../api/AdminService";

interface Props {

}


@observer
export default class AdminDashboardPage extends React.Component<Props, {}> {
  @Inject userStore: UserStore;

  render() {
    return <div>
      <h1>
        <LocaleMessage id={"selfCenter.dashboard"}/>
      </h1>
      <br/>
      <ChartTypeMenu/>
      <div style={{marginTop: "16px"}}>
        <Switch>
          {/*<AsyncRoute exact path={"/self/dashboard/platform"} component={import("./PlatformPage")}/>*/}
          <AsyncRoute exact path={"/self/dashboard/user"} component={import("./UserChartPage")}/>
          <AsyncRoute exact path={"/self/dashboard/credits"} component={import("./CreditsChartPage")}/>
          <AsyncRoute exact path={"/self/dashboard/mission"} component={import("./MissionChartPage")}/>
          <AsyncRoute exact path={"/self/dashboard/instance"} component={import("./InstanceChartPage")}/>
          <Redirect to={"/self/dashboard/mission"}/>
        </Switch>
      </div>
    </div>;
  }
}
