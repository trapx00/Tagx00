import { NavSideMenu } from "../../components/NavSideMenu";
import * as React from "react";

const routes = [

  {
    path: "/leaderboard/exp",
    iconName: "area-chart",
    id: "leaderboard.expBoard",
    match: (pathname: string) => pathname.startsWith("/leaderboard/exp")
  },
  {
    path: "/leaderboard/workerCredits",
    iconName: "credit-card",
    id: "leaderboard.workerCredits",
    match: (pathname: string) => pathname.startsWith("/leaderboard/workerCredits")
  },{
    path: "/leaderboard/requesterCredits",
    iconName: "credit-card",
    id: "leaderboard.requesterCredits",
    match: (pathname: string) => pathname.startsWith("/leaderboard/requesterCredits")
  },

];

export class LeaderboardSideMenu extends React.Component<{},{}> {
  render() {
    return <NavSideMenu routes={routes}/>
  }
}
