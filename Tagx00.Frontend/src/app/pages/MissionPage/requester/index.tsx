import React from 'react';
import { Switch, Route, RouteComponentProps } from "react-router";
import { SidebarLayout } from "../../../layouts/SidebarLayout";
import { MissionSideMenu } from "../MissionSideMenu";
import { RequesterMissionPageSideMenu } from "./RequesterMissionPageSideMenu";
import { AsyncComponent } from "../../../router/AsyncComponent";
import querystring from 'querystring';

interface Props {

}

async function renderMissionPanel() {
  const Page = (await import("./RequesterMissionPanel")).RequesterMissionPanel;
  return <Page/>;
}

async function renderInstancePanel(props: RouteComponentProps<any>) {
  const RequesterInstancePanel = (await import("./RequesterInstancePanel")).RequesterInstancePanel;

  return <RequesterInstancePanel missionId={querystring.parse(props.location.search)["missionId"] as string}/>;
}

async function renderInstanceSeeResult(props: RouteComponentProps<any>) {
  const Page = (await import("./RequesterSeeResultEntry")).RequesterSeeResultEntry;
  return <Page instanceId={props.match.params.instanceId}/>;
}

export class RequesterMissionPage extends React.Component<Props, {}> {
  render() {
    return <SidebarLayout sideMenu={<RequesterMissionPageSideMenu/>}>
      <Switch>
        <Route exact path={"/mission/requester"} render={props => <AsyncComponent render={renderMissionPanel}/>}/>
        <Route path={"/mission/requester/instance"} exact
               render={props => <AsyncComponent render={renderInstancePanel} props={props}/>}/>
        <Route path={"/mission/requester/instance/:instanceId"} exact
               render={props => <AsyncComponent render={renderInstanceSeeResult} props={props}/>}/>
      </Switch>
    </SidebarLayout>;
  }
}
