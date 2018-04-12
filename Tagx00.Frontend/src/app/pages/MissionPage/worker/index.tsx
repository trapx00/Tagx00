import React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router";
import { WorkerMissionPageSideMenu } from "./WorkerMissionPageSideMenu";
import { SidebarLayout } from "../../../layouts/SidebarLayout";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { parseQuerystring } from "../../../router/utils";
import { UserRole } from "../../../models/User";
import { UserStore } from "../../../stores/UserStore";
import { Inject } from "react.di";

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

export class WorkerMissionPage extends React.Component<Props, {}> {

  @Inject userStore: UserStore;

  render() {
    if (this.userStore.user.role !== UserRole.ROLE_WORKER) {
      return "You are not a worker!";
    }
    return <SidebarLayout sideMenu={<WorkerMissionPageSideMenu/>}>
      <Switch>
        <Route exact path={"/mission/worker"}
               render={props => <AsyncComponent render={renderMissionPanel}/>}/>
        <Route exact path={"/mission/worker/:missionId"}
               render={props => <AsyncComponent render={renderSeeResult} props={props}/>}/>
        <Route exact path={"/mission/worker/:missionId/doWork"}
               render={props => <AsyncComponent render={renderDoWork} props={props}/>}/>

      </Switch>
    </SidebarLayout>;
  }
}
