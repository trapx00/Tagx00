import React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import { AsyncComponent } from "../../router/AsyncComponent";
import { Location } from "history";
import { parseQueryString } from "../../router/utils";
import { MissionDetailPage } from "./MissionDetailPage";
import { UserRole } from "../../models/user/User";
import { requireLogin } from "../hoc/RequireLogin";
import { AsyncRoute } from "../../router/AsyncRoute";


async function renderRequester() {
  const Page = (await import("./requester")).RequesterMissionPage;
  return <Page/>;
}

async function renderWorker() {
  const Page = (await import("./worker")).WorkerMissionPage;
  return <Page/>;
}

const redirectMap = {
  [UserRole.ROLE_REQUESTER]: "requester",
  [UserRole.ROLE_WORKER]: "worker"
};

class MissionPageRoot extends React.Component<{ redirectTo: string, search: string }, {}> {
  render() {
    const queries = parseQueryString(this.props.search);
    const missionId = queries.missionId as string;
    if (missionId) {
      return <MissionDetailPage missionId={missionId}/>;
    } else {
      return <Redirect exact from={"/mission"} to={`/mission/${this.props.redirectTo}`}/>
    }
  }
}

interface Props {
  location: Location;
  currentRole?: UserRole;
}

@requireLogin()
export class MissionPage extends React.Component<Props> {

  render() {
    const redirectTo = redirectMap[this.props.currentRole];
    return <Switch>
      <Route exact path={"/mission"}
             render={props => <MissionPageRoot search={props.location.search} redirectTo={redirectTo}/>}/>
      <AsyncRoute path={"/mission/requester"} render={renderRequester}/>
      <AsyncRoute path={"/mission/worker"} render={renderWorker}/>

    </Switch>
  }
}

