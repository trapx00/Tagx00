import React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router";
import { UserRole } from "../../../models/user/User";
import { requireLogin } from "../../hoc/RequireLogin";
import { AsyncRoute } from "../../../router/AsyncRoute";
import { MissionPageRoleRedirect } from "../shared";

interface Props {
  currentRole: UserRole;
}


async function renderDoWork(props: RouteComponentProps<any>) {
  const Page = (await import("./WorkerDoWorkEntry")).WorkerDoWorkEntry;
  return <Page missionId={props.match.params.missionId}/>;
}

async function renderSeeResult(props) {
  const Page = (await import("./WorkerSeeResultEntry")).WorkerSeeResultEntry;
  return <Page missionId={props.match.params.missionId}/>;
}

@requireLogin()
export default class WorkerMissionPage extends React.Component<Props, {}> {

  render() {

    if (this.props.currentRole !== UserRole.ROLE_WORKER) {
      return <MissionPageRoleRedirect role={this.props.currentRole}/>
    }

    return <Switch>
      <AsyncRoute exact path={"/mission/worker/:missionId"}
             render={renderSeeResult}/>
      <AsyncRoute exact path={"/mission/worker/:missionId/doWork"}
             render={renderDoWork}/>
      <Route render={() =>
        <Switch>
          <AsyncRoute exact path={"/mission/worker"} component={import("./WorkerMissionPanel")}/>
        </Switch>}/>
    </Switch>;


  }
}
