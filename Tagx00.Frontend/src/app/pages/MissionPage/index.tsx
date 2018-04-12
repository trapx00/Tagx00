import React from "react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { UserRole } from "../../models/User";
import { Inject } from "react.di";
import { SidebarLayout } from "../../layouts/SidebarLayout";
import { MissionSideMenu } from "./MissionSideMenu";
import { Route, RouteComponentProps, Switch } from "react-router";
import { AsyncComponent } from "../../router/AsyncComponent";
import { RouterStore } from "../../stores/RouterStore";


const config = {
  [UserRole.ROLE_REQUESTER]: {
    allowedPaths: ["/mission","/mission/instance"],
    mission: async () => React.createElement((await import("./requester/RequesterMissionPanel")).RequesterMissionPanel),
    instance: async (missionId: string) =>
      React.createElement(
        (await import("./requester/RequesterInstancePanel")).RequesterInstancePanel,
        { missionId }
        )
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
  const Page = (await import("./create/ImageMissionCreatePage")).ImageMissionCreatePage;
  return <Page/>;
}

@observer
export class MissionPage extends React.Component<{}, {}> {

  @Inject userStore: UserStore;
  @Inject routerStore: RouterStore;

  renderMission = async () => {
    const pageProducer = config[this.userStore.user.role].mission;
    if (typeof pageProducer === 'function') {
      return await pageProducer();
    } else {
      return null;
    }
  };

  renderInstance = async (props: RouteComponentProps<any>) => {
    const pageProducer = config[this.userStore.user.role].instance;

    console.log(this.routerStore.query);


    if (typeof pageProducer === 'function') {
      return await pageProducer(this.routerStore.query["missionId"]);
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
