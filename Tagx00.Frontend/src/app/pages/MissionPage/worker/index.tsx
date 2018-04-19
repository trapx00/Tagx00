import React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router";
import { WorkerMissionPageSideMenu } from "./WorkerMissionPageSideMenu";
import { SiderLayout } from "../../../layouts/SiderLayout";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { UserRole } from "../../../models/user/User";
import { requireLogin } from "../../hoc/RequireLogin";

interface Props {

}

async function renderMissionPanel() {
  const Page = (await import("./WorkerMissionPanel")).WorkerMissionPanel;
  return <Page/>;
}

async function renderDoWork(props: RouteComponentProps<any>) {
  const Page = (await import("./WorkerDoWorkEntry")).WorkerDoWorkEntry;
  return <Page missionId={props.match.params.missionId}/>;
}

async function renderSeeResult(props) {
  const Page = (await import("./WorkerSeeResultEntry")).WorkerSeeResultEntry;
  return <Page missionId={props.match.params.missionId}/>;
}

@requireLogin(UserRole.ROLE_WORKER)
export class WorkerMissionPage extends React.Component<Props, {}> {

  render() {
    return <Switch>
      <Route exact path={"/mission/worker/:missionId"}
             render={props => <AsyncComponent render={renderSeeResult} props={props}/>}/>
      <Route exact path={"/mission/worker/:missionId/doWork"}
             render={props => <AsyncComponent render={renderDoWork} props={props}/>}/>
      <Route render={() => <SiderLayout leftSider={<WorkerMissionPageSideMenu/>}>
        <Switch>
          <Route exact path={"/mission/worker"}
                 render={props => <AsyncComponent render={renderMissionPanel}/>}/>
        </Switch>
      </SiderLayout>}/>
    </Switch>;


  }
}
