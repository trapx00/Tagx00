import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { WorkerDashboardPage } from "./worker/WorkerDashboardPage";
import { RequesterDashboardPage } from "./requester/RequesterDashboardPage";
import { UserRole } from "../../../models/user/User";
import AdminDashboardPage from "./admin";
import { RouteComponentProps } from "react-router";
import { parseQueryString } from "../../../router/utils";
import { RouterStore } from "../../../stores/RouterStore";
import { requireLogin } from "../../hoc/RequireLogin";


interface Props {
}

@requireLogin()
export default class DashboardPage extends React.Component<Props, {}> {

  @Inject userStore: UserStore;

  @Inject routerStore: RouterStore;

  render() {

    const role = this.routerStore.query["role"] as string || this.userStore.user.role;
    const username = this.routerStore.query["username"] as string || this.userStore.user.username;


    switch (role) {
      case UserRole.ROLE_WORKER:
        return <WorkerDashboardPage username={username}/>;
      case UserRole.ROLE_REQUESTER:
        return <RequesterDashboardPage username={username}/>;
      default:
        return <AdminDashboardPage/>;
    }
  }

}
