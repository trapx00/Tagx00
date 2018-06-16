import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { WorkerDashboardPage } from "./WorkerDashboardPage";
import { RequesterDashboardPage } from "./RequesterDashboardPage";
import { UserRole } from "../../../models/user/User";
import AdminDashboardPage from "./admin";
import Default from "./admin/Default";

export default class DashboardPage extends React.Component<{}, {}> {

  @Inject userStore: UserStore;

  render() {
    const role = this.userStore.user.role;
    switch (role) {
      case UserRole.ROLE_WORKER:
        return <WorkerDashboardPage/>;
      case UserRole.ROLE_REQUESTER:
        return <RequesterDashboardPage/>;
      case UserRole.ROLE_ADMIN:
        return <Default/>;
      default:
        return null;
    }
  }

}
