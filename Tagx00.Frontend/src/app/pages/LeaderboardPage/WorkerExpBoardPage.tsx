import React from "react";
import { Table } from "antd";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";
import { DefinitionItem } from "../../components/DefinitionItem";
import { LocaleMessage } from "../../internationalization/components";
import { AsyncComponent } from "../../router/AsyncComponent";
import { UserRole } from "../../models/user/User";
import { Loading } from "../../components/Common/Loading";
import { MajorTitle, MinorTitle } from "./common";
import { LeaderboardService } from "../../api/LeaderboardService";
import { observer } from "mobx-react";

@observer
export default class WorkerExpBoardPage extends React.Component<{}, {}> {

  @Inject leaderboardService: LeaderboardService;
  @Inject userStore: UserStore;

  renderUserRank = async () => {


    const selfRank = await this.leaderboardService.getSpecificWorkerCreditRank(this.userStore.user.username);

    return <DefinitionItem prompt={<LocaleMessage id={"leaderboard.selfRank"}/>}>
      {selfRank.user.order}
    </DefinitionItem>
  };

  renderLeaderboard = async () => {
    const workerExpBoard = await this.leaderboardService.getWorkerExpBoard(null, null);
    const columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: "username"
    }, {
      title: '积分',
      dataIndex: 'exp',
      key: "exp"
    }, {
      title: '等级',
      dataIndex: 'level',
      key: "level"
    }, {
      title: '排名',
      dataIndex: 'order',
      key: "order"
    }];
      return (
        <div>
          <MinorTitle>
            <LocaleMessage id={"leaderboard.rankListBoard"}/>
          </MinorTitle>
          <br/>
          <Table rowKey={"order"} dataSource={workerExpBoard.users} columns={columns} pagination={workerExpBoard.pagingInfo}/>
        </div>
      );
  };

  render() {
    return <div>
      <MajorTitle>
        <LocaleMessage id={"leaderboard.expBoard"}/>
      </MajorTitle>
      {
        (this.userStore.loggedIn && this.userStore.user.role === UserRole.ROLE_WORKER)
        && <AsyncComponent render={this.renderUserRank} componentWhenLoading={<Loading/>}/>
      }
      <AsyncComponent render={this.renderLeaderboard} componentWhenLoading={<Loading/>}/>
    </div>

  }
}
