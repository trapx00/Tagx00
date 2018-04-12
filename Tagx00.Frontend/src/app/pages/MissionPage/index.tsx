import React from "react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { AsyncComponent } from "../../router/AsyncComponent";
import { Location } from "history";


async function renderRequester() {
  const Page = (await import("./requester")).RequesterMissionPage;
  return <Page/>;
}

async function renderWorker() {
  const Page = (await import("./worker")).WorkerMissionPage;
  return <Page/>;
}

@observer
export class MissionPage extends React.Component<{location: Location}> {

  @Inject userStore: UserStore;

  render() {
    console.log("render");
    if (this.userStore.loggedIn) {
      const redirectTo = this.userStore.user.role.split("_")[1].toLowerCase();
      return <Switch>
        <Redirect exact from={"/mission"} to={`/mission/${redirectTo}`}/>
        <Route path={"/mission/requester"} render={() => <AsyncComponent render={renderRequester}/>}/>
        <Route path={"/mission/worker"} render={() => <AsyncComponent render={renderWorker}/>}/>

      </Switch>
    } else {
      return "login first";
    }
  }
}

