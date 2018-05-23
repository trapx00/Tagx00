import React from 'react';
import { Redirect, Switch } from "react-router";
import { AsyncRoute } from "../../router/AsyncRoute";

interface Props {
}


export default class LeaderboardPage extends React.Component<Props, {}> {

  render() {
    return <Switch>
        <Redirect exact from={"/leaderboard"} to={"/leaderboard/exp"}/>
        <AsyncRoute path={"/leaderboard/exp"} component={import("./WorkerExpBoardPage")}/>
        <AsyncRoute path={"/leaderboard/workerCredits"} component={import("./WorkerCreditBoardPage")}/>
        <AsyncRoute path={"/leaderboard/requesterCredits"} component={import("./RequesterCreditBoardPage")}/>
      </Switch>
  }
}
