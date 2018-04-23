import React from 'react';
import { SiderLayout } from "../../layouts/SiderLayout";
import { LeaderboardSideMenu } from "./LeaderboardSideMenu";
import { Redirect, Switch } from "react-router";
import { AsyncRoute } from "../../router/AsyncRoute";
import { Location } from "history";

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


export class LeaderboardPage extends React.Component<Props, {}> {

  render() {
    return <SiderLayout leftSider={<LeaderboardSideMenu/>}>
      <Switch>
        <Redirect exact from={"/leaderboard"} to={"/leaderboard/exp"}/>
        <AsyncRoute path={"/leaderboard/exp"} render={renderExpLeaderboard}/>
        <AsyncRoute path={"/leaderboard/workerCredits"} render={renderWorkerCreditLeaderboard}/>
        <AsyncRoute path={"/leaderboard/requesterCredits"} render={renderRequesterCreditLeaderboard}/>
      </Switch>
    </SiderLayout>
  }
}
