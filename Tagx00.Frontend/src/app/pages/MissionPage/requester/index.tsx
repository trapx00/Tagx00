import React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router";
import { SiderLayout } from "../../../layouts/SiderLayout";
import { RequesterMissionPageSideMenu } from "./RequesterMissionPageSideMenu";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { parseQueryString } from "../../../router/utils";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { UserRole } from "../../../models/User";

interface Props {

}

async function renderMissionPanel() {
  const Page = (await import("./RequesterMissionPanel")).RequesterMissionPanel;
  return <Page/>;
}

async function renderInstancePanel(props: RouteComponentProps<any>) {
  const RequesterInstancePanel = (await import("./RequesterInstancePanel")).RequesterInstancePanel;
  console.log(parseQueryString(props));
  return <RequesterInstancePanel missionId={parseQueryString(props).missionId as string}/>;
}

async function renderInstanceSeeResult(props: RouteComponentProps<any>) {
  const Page = (await import("./RequesterSeeResultEntry")).RequesterSeeResultEntry;
  return <Page instanceId={props.match.params.instanceId}/>;
}

async function renderCreateImage() {
  const Page = (await import("./create/ImageMissionCreatePage")).ImageMissionCreatePage;
  return <Page/>;
}
export class RequesterMissionPage extends React.Component<Props, {}> {

  @Inject userStore: UserStore;

  render() {
    if (this.userStore.user.role !== UserRole.ROLE_REQUESTER) {
      return "You are not a requester!";
    }
    return <Switch>
      <Route exact path={"/mission/requester/instance/:instanceId"} render={props => <AsyncComponent render={renderInstanceSeeResult} props={props}/>}/>
      <Route render={() => <SiderLayout leftSider={<RequesterMissionPageSideMenu/>}>
        <Switch>
          <Route exact path={"/mission/requester/create/image"}
                 render={props => <AsyncComponent render={renderCreateImage}/>}/>
          <Route exact path={"/mission/requester"} render={props => <AsyncComponent render={renderMissionPanel}/>}/>
          <Route path={"/mission/requester/instance"} exact
                 render={props => <AsyncComponent render={renderInstancePanel} props={props}/>}/>
        </Switch>
      </SiderLayout>}/>

    </Switch>;
  }
}
