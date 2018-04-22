import React from 'react';
import { SiderLayout } from "../../layouts/SiderLayout";
import { LeaderboardSideMenu } from "./LeaderboardSideMenu";
import { Redirect, Route, Switch } from "react-router";
import { AsyncComponent } from "../../router/AsyncComponent";

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
        <Route path={"/leaderboard/exp"} render={props => <AsyncComponent render={renderExpLeaderboard}/>}/>
        <Route path={"/leaderboard/workerCredits"} render={props => <AsyncComponent render={renderWorkerCreditLeaderboard}/>}/>
        <Route path={"/leaderboard/requesterCredits"} render={props => <AsyncComponent render={renderRequesterCreditLeaderboard}/>}/>
      </Switch>
    </SiderLayout>
  }
}
