import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Location } from "history";
import { parseQueryString } from "../../router/utils";
import { MissionDetailPage } from "./MissionDetailPage";
import { UserRole } from "../../models/user/User";
import { requireLogin } from "../hoc/RequireLogin";
import { AsyncRoute } from "../../router/AsyncRoute";
import { MissionPageRoleRedirect } from "./shared";

class MissionPageRoot extends React.Component<{ role: UserRole, search: string }, {}> {
  render() {
    const queries = parseQueryString(this.props.search);
    const missionId = queries.missionId as string;
    if (missionId) {
      return <MissionDetailPage missionId={missionId}/>;
    } else {
      return <MissionPageRoleRedirect role={this.props.role}/>;
    }
  }
}

interface Props {
  location: Location;
  currentRole?: UserRole;
}

@requireLogin()
export default class MissionPage extends React.Component<Props> {

  render() {
    return <Switch>
      <Route exact path={"/mission"}
             render={props => <MissionPageRoot search={props.location.search} role={this.props.currentRole}/>}/>
      <AsyncRoute path={"/mission/requester"} component={import("./requester")}/>
      <AsyncRoute path={"/mission/worker"} component={import("./worker")}/>

    </Switch>
  }
}

