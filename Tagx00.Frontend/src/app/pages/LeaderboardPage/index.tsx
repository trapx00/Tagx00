import React from 'react';
import { SubMenuLayout } from "../../layouts/SubMenuLayout";
import { Redirect, Switch } from "react-router";
import { AsyncRoute } from "../../router/AsyncRoute";
import { Location } from "history";
import { Inject } from "react.di";
import { NavStore } from "../../stores/NavStore";

interface Props {
}

async function renderExpLeaderboard() {
  const Page = (await import("./WorkerExpBoardPage")).WorkerExpBoardPage;
  return <Page/>;
}

async function renderWorkerCreditLeaderboard() {
  const Page = (await import("./WorkerCreditBoardPage")).WorkerCreditBoardPage;
  return <Page/>;
}

async function renderRequesterCreditLeaderboard() {
 const Page = (await import("./RequesterCreditBoardPage")).RequesterCreditBoardPage;
  return <Page/>;
}

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

export class LeaderboardPage extends React.Component<Props, {}> {

  render() {
    return <SubMenuLayout routes={routes}>
      <Switch>
        <Redirect exact from={"/leaderboard"} to={"/leaderboard/exp"}/>
        <AsyncRoute path={"/leaderboard/exp"} render={renderExpLeaderboard}/>
        <AsyncRoute path={"/leaderboard/workerCredits"} render={renderWorkerCreditLeaderboard}/>
        <AsyncRoute path={"/leaderboard/requesterCredits"} render={renderRequesterCreditLeaderboard}/>
      </Switch>
    </SubMenuLayout>
  }
}
