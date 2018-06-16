import React from 'react';
import { UserStore } from "../../../../stores/UserStore";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { LocaleMessage } from "../../../../internationalization/components";
import { Redirect, Switch } from "react-router";
import { AsyncRoute } from "../../../../router/AsyncRoute";
import { ChartTypeMenu } from "./ChartTypeMenu";

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
          <AsyncRoute exact path={"/account/admin/dashboard/PLAT_INFO"} component={import("./Default")}/>
          <AsyncRoute exact path={"/account/admin/dashboard/MISSION_CHART"} component={import("./MissionChart")}/>
          <AsyncRoute exact path={"/account/admin/dashboard/INSTANCE_CHART"} component={import("./InstanceChart")}/>
          <AsyncRoute exact path={'/account/admin/dashboard/DATE_CHART'} component={import("./DateChart")}/>
          <Redirect to={"/account/admin/dashboard/PLAT_INFO"}/>
        </Switch>
      </div>
    </div>;
  }
}
