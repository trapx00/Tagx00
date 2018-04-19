import React from "react";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { RequesterService } from "../../api/RequesterService";
import { DefinitionItem } from "../../components/DefinitionItem";
import { LocaleMessage } from "../../internationalization/components";
import { AsyncComponent } from "../../router/AsyncComponent";

export class RequesterCreditBoardPage extends React.Component<{},{}> {
  @Inject requesterService: RequesterService;
  @Inject userStore: UserStore;

  leaderboard = async () => {
    const selfRank = await this.requesterService.getSpecificRequesterRank(this.userStore.user.username,this.userStore.token);
    const requesterCreditBoard = await this.requesterService.getRequesterCreditBoard(null,null,this.userStore.token);
    return (
      <div>
        <DefinitionItem prompt={"我的排名"} children={selfRank.requesterCreditSelfRank.order}/>
        <DefinitionItem prompt={"所有工人经验排行榜"} children={requesterCreditBoard.creditBoardList}/>
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