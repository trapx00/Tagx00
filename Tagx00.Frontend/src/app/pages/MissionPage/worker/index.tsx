import React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router";
import { UserRole } from "../../../models/user/User";
import { requireLogin } from "../../hoc/RequireLogin";
import { AsyncRoute } from "../../../router/AsyncRoute";
import { MissionPageRoleRedirect } from "../shared";
import { UserStore } from "../../../stores/UserStore";
import { Inject } from "react.di";

interface Props {

}


async function renderDoWork(props: RouteComponentProps<any>) {
  const Page = (await import("./WorkerDoWorkEntry")).WorkerDoWorkEntry;
  return <Page missionId={props.match.params.missionId}/>;
}

async function renderSeeResult(props) {
  const Page = (await import("./WorkerSeeResultEntry")).WorkerSeeResultEntry;
  return <Page missionId={props.match.params.missionId}/>;
}

export default class WorkerMissionPage extends React.Component<Props, {}> {

  @Inject userStore: UserStore;

  render() {

    if (this.userStore.user.role !== UserRole.ROLE_WORKER) {
      return <MissionPageRoleRedirect role={this.userStore.user.role}/>
    }

    return <Switch>
      <AsyncRoute exact path={"/mission/worker/:missionId"}
             render={renderSeeResult}/>
      <AsyncRoute exact path={"/mission/worker/:missionId/doWork"}
             render={renderDoWork}/>
      <Route render={() =>
        <Switch>
          <AsyncRoute exact path={"/mission/worker"} component={import("./WorkerMissionPanel")}/>
        </Switch>
      }/>
    </Switch>;


  }
}
