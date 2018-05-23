import React from "react";
import { Inject } from "react.di";
import { WorkerService } from "../../api/WorkerService";
import { UserStore } from "../../stores/UserStore";
import { UserRole } from "../../models/user/User";
import { DefinitionItem } from "../../components/DefinitionItem";
import { Table } from "antd";
import { LocaleMessage } from "../../internationalization/components";
import { AsyncComponent, ObserverAsyncComponent } from "../../router/AsyncComponent";
import { MajorTitle, MinorTitle } from "./common";
import { LeaderboardService } from "../../api/LeaderboardService";
import { Loading } from "../../components/Common/Loading";
import { observer } from "mobx-react";

@observer
export default class WorkerCreditBoardPage extends React.Component<{}, {}> {
  @Inject leaderboardService: LeaderboardService;
  @Inject userStore: UserStore;

  renderUserRank = async () => {


    const selfRank = await this.leaderboardService.getSpecificWorkerCreditRank(this.userStore.user.username);

    return <DefinitionItem prompt={<LocaleMessage id={"leaderboard.selfRank"}/>}>
      {selfRank.user.order}
    </DefinitionItem>
  };

  renderLeaderboard = async () => {

    const workerCreditBoard = await this.leaderboardService.getWorkerCreditBoard(null, null);
    const columns = [{
      title: '用户名',
      dataIndex: 'username',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '积分',
      dataIndex: 'credits',
    }, {
      title: '排名',
      dataIndex: 'order',
    }];

    return (
      <div>
        <MinorTitle>
          <LocaleMessage id={"leaderboard.rankListBoard"}/>
        </MinorTitle>
        <br/>
        <Table rowKey={"order"} dataSource={workerCreditBoard.users} columns={columns} pagination={workerCreditBoard.pagingInfo}/>
      </div>
    );
  };

  render() {
    return <div>
      <MajorTitle>
        <LocaleMessage id={"leaderboard.workerCredits"}/>
      </MajorTitle>
      {
        (this.userStore.loggedIn && this.userStore.user.role === UserRole.ROLE_WORKER)&&
        <AsyncComponent render={this.renderUserRank} componentWhenLoading={<Loading/>}/>
      }

      <AsyncComponent render={this.renderLeaderboard} componentWhenLoading={<Loading/>}/>
    </div>

  }

}
