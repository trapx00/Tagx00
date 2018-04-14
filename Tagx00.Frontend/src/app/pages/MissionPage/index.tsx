import React from "react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { match, Redirect, Route, Switch } from "react-router";
import { AsyncComponent } from "../../router/AsyncComponent";
import { Location } from "history";
import { parseQueryString } from "../../router/utils";
import { MissionDetailPage } from "./MissionDetailPage";


async function renderRequester() {
  const Page = (await import("./requester")).RequesterMissionPage;
  return <Page/>;
}

async function renderWorker() {
  const Page = (await import("./worker")).WorkerMissionPage;
  return <Page/>;
}

class MissionPageRoot extends React.Component<{redirectTo: string, search: string}, {}> {
  render() {
    const missionId = parseQueryString(this.props.search).missionId as string;

    if (missionId) {
      return <MissionDetailPage missionId={missionId}/>;
    } else {
      return <Redirect exact from={"/mission"} to={`/mission/${this.props.redirectTo}`}/>
    }
  }
}

@observer
export class MissionPage extends React.Component<{location: Location}> {

  @Inject userStore: UserStore;

  render() {
    console.log("render");
    if (this.userStore.loggedIn) {
      const redirectTo = this.userStore.user.role.split("_")[1].toLowerCase();
      return <Switch>
        <Route exact path={"/mission"} render={props => <MissionPageRoot search={props.location.search} redirectTo={redirectTo} />}/>
        <Route path={"/mission/requester"} render={() => <AsyncComponent render={renderRequester}/>}/>
        <Route path={"/mission/worker"} render={() => <AsyncComponent render={renderWorker}/>}/>

      </Switch>
    } else {
      return "login first";
    }
  }
}

