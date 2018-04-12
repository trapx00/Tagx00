import React from "react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { UserRole } from "../../models/User";
import { Inject } from "react.di";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import { AsyncComponent } from "../../router/AsyncComponent";
import { RouterStore } from "../../stores/RouterStore";


const config = {
  [UserRole.ROLE_REQUESTER]:
    async () => React.createElement((await import("./requester")).RequesterMissionPage),
  [UserRole.ROLE_WORKER]:
    async () => React.createElement((await import("./worker")).WorkerMissionPage),
  [UserRole.ROLE_ADMIN]:
    null
};
@observer
export class MissionPage extends React.Component<{}, {}> {

  @Inject userStore: UserStore;
  @Inject routerStore: RouterStore;

  renderPage = async (props: RouteComponentProps<any>) => {
    const producer = config[props.match.params["role"]];
    if (producer) {
      return await producer();
    } else {
      return null;
    }
  };


  render() {

    if (this.userStore.loggedIn) {
      return <Switch>
          <Redirect path={"/mission"} to={`/mission/${this.userStore.user.role.toLowerCase()}`}/>
          <Route path={"/mission/:role"} render={props => <AsyncComponent render={this.renderPage} props={props}/>}/>
        </Switch>
    } else {
      return "login first";
    }
  }
}
