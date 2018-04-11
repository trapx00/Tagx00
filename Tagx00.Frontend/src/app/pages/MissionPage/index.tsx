import React from "react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { UserRole } from "../../models/User";
import { Inject } from "react.di";
import { SidebarLayout } from "../../layouts/SidebarLayout";
import { MissionSideMenu } from "./MissionSideMenu";
import { Route, Switch } from "react-router";
import { AsyncComponent } from "../../router/AsyncComponent";


const config = {
  [UserRole.ROLE_REQUESTER]: {
    allowedPaths: ["/mission","/mission/instance"],
    mission: async () => React.createElement((await import("./requester/RequesterMissionPanel")).RequesterMissionPanel),
    instance: async () => React.createElement((await import("./requester/RequesterInstancePanel")).RequesterInstancePanel)
  },
  [UserRole.ROLE_WORKER]: {
    allowedPaths: ["/mission"],
    mission: async () => React.createElement((await import("./worker/WorkerMissionPanel")).WorkerMissionPanel),
    instance: null
  },
  [UserRole.ROLE_ADMIN]: {
    allowedPaths: [],
    mission: null,
    instance: null
  }
};

async function renderImageCreate() {
  const Page = (await import("./create/ImageMissioNCreatePage")).ImageMissionCreatePage;
  return <Page/>;
}

@observer
export class MissionPage extends React.Component<{}, {}> {

  @Inject userStore: UserStore;

  renderMission = async () => {
    const pageProducer = config[this.userStore.user.role].mission;
    if (typeof pageProducer === 'function') {
      return await pageProducer();
    } else {
      return null;
    }
  };

  renderInstance = async (props) => {
    const pageProducer = config[this.userStore.user.role].instance;
    if (typeof pageProducer === 'function') {
      return await pageProducer();
    } else {
      return null;
    }
  };

  render() {

    if (this.userStore.loggedIn) {
      return <SidebarLayout sideMenu={<MissionSideMenu allowedPaths={config[this.userStore.user.role].allowedPaths}/>}>
        <div ref={null}/>
        <Switch>
          <Route path={"/mission"} exact={true} render={() => <AsyncComponent render={this.renderMission}/>}/>
          <Route path={"/mission/create/image"} exact render={() => <AsyncComponent render={renderImageCreate}/>}/>
          <Route path={"/mission/instance"} exact={true} render={(props) => <AsyncComponent render={this.renderInstance} props={props}/>}/>
        </Switch>
      </SidebarLayout>
    } else {
      return "login first";
    }
  }
}
