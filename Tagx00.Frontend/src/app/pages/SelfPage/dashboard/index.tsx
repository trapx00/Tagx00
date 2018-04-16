import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { WorkerDashboardPage } from "./WorkerDashboardPage";
import { RequesterDashboardPage } from "./RequesterDashboardPage";
import { AdminDashboardPage } from "./AdminDashboardPage";
import { UserRole } from "../../../models/user/User";

export class DashboardPage extends React.Component<{}, {}> {

  @Inject userStore: UserStore;

  render() {
    const role = this.userStore.user.role;
    switch (role) {
      case UserRole.ROLE_WORKER:
        return <WorkerDashboardPage/>;
      case UserRole.ROLE_REQUESTER:
        return <RequesterDashboardPage/>;
      case UserRole.ROLE_ADMIN:
        return <AdminDashboardPage/>;
      default:
        return null;
    }
  }

}
