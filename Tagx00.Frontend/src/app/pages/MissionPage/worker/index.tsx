import React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router";
import { SubMenuLayout } from "../../../layouts/SubMenuLayout";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { UserRole } from "../../../models/user/User";
import { requireLogin } from "../../hoc/RequireLogin";
import { AsyncRoute } from "../../../router/AsyncRoute";
import { NavItemProps } from "../../../stores/NavStore";

interface Props {

}

const routes: NavItemProps[] = [
  {
    path: "/mission/worker",
    iconName: "tag-o",
    id: "missions.sideMenu.mission",
    match(pathname: string) {
      return pathname.startsWith("/mission/worker")
    }
  },
];


async function renderDoWork(props: RouteComponentProps<any>) {
  const Page = (await import("./WorkerDoWorkEntry")).WorkerDoWorkEntry;
  return <Page missionId={props.match.params.missionId}/>;
}

async function renderSeeResult(props) {
  const Page = (await import("./WorkerSeeResultEntry")).WorkerSeeResultEntry;
  return <Page missionId={props.match.params.missionId}/>;
}

@requireLogin(UserRole.ROLE_WORKER)
export default class WorkerMissionPage extends React.Component<Props, {}> {

  render() {
    return <Switch>
      <AsyncRoute exact path={"/mission/worker/:missionId"}
             render={renderSeeResult}/>
      <AsyncRoute exact path={"/mission/worker/:missionId/doWork"}
             render={renderDoWork}/>
      <Route render={() => <SubMenuLayout routes={routes}>
        <Switch>
          <AsyncRoute exact path={"/mission/worker"} component={import("./WorkerMissionPanel")}/>
        </Switch>
      </SubMenuLayout>}/>
    </Switch>;


  }
}
