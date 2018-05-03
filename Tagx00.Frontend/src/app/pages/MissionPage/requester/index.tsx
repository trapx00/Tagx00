import React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router";
import { SubMenuLayout } from "../../../layouts/SubMenuLayout";
import { parseQueryString } from "../../../router/utils";
import { UserRole } from "../../../models/user/User";
import { requireLogin } from "../../hoc/RequireLogin";
import { AsyncRoute } from "../../../router/AsyncRoute";
import { NavItemProps } from "../../../stores/NavStore";

interface Props {

}


const routes: NavItemProps[] = [
  {
    path: "/mission/requester",
    iconName: "tag-o",
    id: "missions.sideMenu.mission",
    match(pathname: string) {
      return pathname === "/mission/requester" || pathname.startsWith("/mission/requester/create")
    }
  },
  {
    path: "/mission/requester/instance",
    iconName: "tag",
    id: "missions.sideMenu.instance",
    match(pathname: string) {
      return pathname.startsWith("/mission/requester/instance")
    }
  }
];

async function renderMissionPanel() {
  const Page = (await import("./RequesterMissionPanel")).RequesterMissionPanel;
  return <Page/>;
}

async function renderInstancePanel(props: RouteComponentProps<any>) {
  const RequesterInstancePanel = (await import("./RequesterInstancePanel")).RequesterInstancePanel;
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

@requireLogin(UserRole.ROLE_REQUESTER)
export class RequesterMissionPage extends React.Component<Props, {}> {

  render() {
    return <Switch>
      <AsyncRoute exact path={"/mission/requester/instance/:instanceId"} render={renderInstanceSeeResult}/>}/>
      <Route render={() => <SubMenuLayout routes={routes}>
        <Switch>
          <AsyncRoute exact path={"/mission/requester/create/image"}
                 render={renderCreateImage}/>
          <AsyncRoute exact path={"/mission/requester"} render={renderMissionPanel}/>
          <AsyncRoute path={"/mission/requester/instance"} exact
                 render={renderInstancePanel}/>
        </Switch>
      </SubMenuLayout>}/>

    </Switch>;
  }
}
