import React from 'react';
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { UserRole } from "../../models/user/User";
import { WorkerExpBoardPage } from "./WorkerExpBoardPage";
import { RequesterCreditBoardPage } from "./RequesterCreditBoardPage";

interface Props {

}

export class LeaderboardPage extends React.Component<Props, {}> {
  @Inject userStore: UserStore;

  render() {
    const role = this.userStore.user.role;
    switch (role) {
      case UserRole.ROLE_WORKER:
        return <WorkerExpBoardPage/>;
      case UserRole.ROLE_REQUESTER:
        return <RequesterCreditBoardPage/>;
      default:
        return null;
    }
  }
}
