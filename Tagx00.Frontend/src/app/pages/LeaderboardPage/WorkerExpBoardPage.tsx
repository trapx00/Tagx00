import { WorkerService } from "../../api/WorkerService";
import React from "react";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { AsyncComponent } from "../../router/AsyncComponent";
import { LocaleMessage } from "../../internationalization/components";
import { DefinitionItem } from "../../components/DefinitionItem";

export class WorkerExpBoardPage extends React.Component<{},{}> {

  @Inject workerService: WorkerService;
  @Inject userStore: UserStore;

  leaderboard = async () => {
    const selfRank = await this.workerService.getSpecificWorkerExpRank(this.userStore.user.username,this.userStore.token);
    const workerExpBoard = await this.workerService.getWorkerExpBoard(null,null,this.userStore.token);
    return (
      <div>
        <DefinitionItem prompt={"我的排名"} children={selfRank.workerExpSelfRank.order}/>
        <DefinitionItem prompt={"所有工人经验排行榜"} children={workerExpBoard.expBoardList}/>
      </div>
    );
  }

  render() {
    return <div>
      <h1>
        <LocaleMessage id={"selfCenter.dashboard"}/>
      </h1>
      <AsyncComponent render={this.leaderboard}/>
    </div>

  }
}