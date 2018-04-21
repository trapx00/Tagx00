import React from "react";
import { Menu } from 'antd';
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { Link } from 'react-router-dom';
import { Inject } from "react.di";
import { NavSideMenu } from "../../components/NavSideMenu";

const { SubMenu } = Menu;

interface Props {

}

const routes = [
  {
    path: "/self/dashboard",
    iconName: "dashboard",
    id: "selfCenter.dashboard",
    match: (pathname: string) => pathname.startsWith("/self/dashboard")
  },
  {
    path: "/self/achievement",
    iconName: "star-o",
    id: "selfCenter.achievement",
    match: (pathname: string) => pathname.startsWith("/self/achievement")
  },
  {
    path: "/self/leaderboard/requester",
    iconName: "bars",
    id: "富人排行榜",
    match: (pathname: string) => pathname.startsWith("/self/leaderboard/index")
  },
  {
    path: "/self/leaderboard/worker/credits",
    iconName: "bars",
    id: "积分排行榜",
    match: (pathname: string) => pathname.startsWith("/self/leaderboard/WorkerCreditBoardPage")
  },
  {
    path: "/self/leaderboard/worker/exp",
    iconName: "bars",
    id: "经验排行榜",
    match: (pathname: string) => pathname.startsWith("/self/leaderboard/index")
  },
  {
    path: "/self/personalInfo",
    iconName: "info",
    id: "selfCenter.personalInfo",
    match: (pathname: string) => pathname.startsWith("/self/personalInfo")
  }
];

@observer
export class SelfSideMenu extends React.Component<Props, any> {

  @Inject userStore: UserStore;

  render() {

    return <div>
      <p>welcome, {this.userStore.user.username}</p>
      <NavSideMenu routes={routes}/>
    </div>;
  }

}
