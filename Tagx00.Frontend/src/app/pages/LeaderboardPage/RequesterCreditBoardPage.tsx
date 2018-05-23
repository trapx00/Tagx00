import React from "react";
import { Table } from "antd";
import { Inject } from "react.di";
import { RequesterService } from "../../api/RequesterService";
import { UserStore } from "../../stores/UserStore";
import { DefinitionItem } from "../../components/DefinitionItem";
import { LocaleMessage } from "../../internationalization/components";
import { AsyncComponent, ObserverAsyncComponent } from "../../router/AsyncComponent";
import { UserRole } from "../../models/user/User";
import { LeaderboardService } from "../../api/LeaderboardService";
import { Loading } from "../../components/Common/Loading";
import { MajorTitle, MinorTitle } from "./common";
import { observer } from "mobx-react";

@observer
export default class RequesterCreditBoardPage extends React.Component<{}, {}> {
  @Inject leaderboardService: LeaderboardService;
  @Inject userStore: UserStore;

  renderUserRank = async () => {


    const selfRank = await this.leaderboardService.getSpecificRequesterRank(this.userStore.user.username);

    return <DefinitionItem prompt={<LocaleMessage id={"leaderboard.selfRank"}/>}>
      {selfRank.user.order}
    </DefinitionItem>
  };

  renderLeaderboard = async () => {
    const requesterCreditBoard = await this.leaderboardService.getRequesterCreditBoard(null, null);
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
        <Table rowKey={"order"} dataSource={requesterCreditBoard.users} columns={columns}
               pagination={requesterCreditBoard.pagingInfo}/>
      </div>
    );
  };

  render() {
    return <div>
      <MajorTitle>
        <LocaleMessage id={"leaderboard.requesterCredits"}/>
      </MajorTitle>
      {
        (this.userStore.loggedIn && this.userStore.user.role === UserRole.ROLE_REQUESTER) &&
        <AsyncComponent render={this.renderUserRank} componentWhenLoading={<Loading/>}/>
      }
      <AsyncComponent render={this.renderLeaderboard} componentWhenLoading={<Loading/>}/>
    </div>

  }
}
