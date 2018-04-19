import React from "react";
import { WorkerService } from "../../api/WorkerService";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { DefinitionItem } from "../../components/DefinitionItem";
import { LocaleMessage } from "../../internationalization/components";
import { AsyncComponent } from "../../router/AsyncComponent";

export class WorkerCreditBoardPagem extends React.Component<{},{}> {
  @Inject workerService: WorkerService;
  @Inject userStore: UserStore;

  leaderboard = async () => {
    const selfRank = await this.workerService.getSpecificWorkerCreditRank(this.userStore.user.username,this.userStore.token);
    const workerCreditBoard = await this.workerService.getWorkerCreditBoard(null,null,this.userStore.token);
    return (
      <div>
        <DefinitionItem prompt={"我的排名"} children={selfRank.workerCreditSelfRank.order}/>
        <DefinitionItem prompt={"所有工人积分排行榜"} children={workerCreditBoard.creditBoardList}/>
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