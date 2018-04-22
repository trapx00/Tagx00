import { NavSideMenu } from "../../components/NavSideMenu";
import * as React from "react";

const routes = [

  {
    path: "/leaderboard/exp",
    iconName: "null",
    id: "经验排行榜",
    match: (pathname: string) => pathname.startsWith("/leaderboard/exp")
  },
  {
    path: "/leaderboard/workerCredits",
    iconName: "null",
    id: "工人富人榜",
    match: (pathname: string) => pathname.startsWith("/leaderboard/workerCredits")
  },{
    path: "/leaderboard/requesterCredits",
    iconName: "null",
    id: "发起者富人榜",
    match: (pathname: string) => pathname.startsWith("/leaderboard/requesterCredits")
  },

];

export class LeaderboardSideMenu extends React.Component<{},{}> {
  render() {
    return <NavSideMenu routes={routes}/>
  }
}