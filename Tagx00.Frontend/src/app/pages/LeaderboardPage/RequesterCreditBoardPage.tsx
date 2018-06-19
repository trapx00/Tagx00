import React from "react";
import { Table } from "antd";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";
import { DefinitionItem } from "../../components/DefinitionItem";
import { LocaleMessage } from "../../internationalization/components";
import { AsyncComponent } from "../../router/AsyncComponent";
import { UserRole } from "../../models/user/User";
import { LeaderboardService } from "../../api/LeaderboardService";
import { Loading } from "../../components/Common/Loading";
import { MajorTitle, MAX_TOP_LIST_LENGTH, MinorTitle } from "./common";
import { observer } from "mobx-react";
import { LeaderboardLineChart } from "./lineChart/LeaderboardLineChart";
import { range } from "../../../utils/Range";
import { max } from "moment";

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

  toProfile(username: string) {
    this.userStore.jumpToProfile(username, UserRole.ROLE_REQUESTER);
  }

  renderLeaderboard = async () => {
    const requesterCreditBoard = await this.leaderboardService.getRequesterCreditBoard(null, null);
    const columns = [{
      title: '用户名',
      dataIndex: 'username',
      render: text => <a onClick={() => this.toProfile(text)}>{text}</a>,
    }, {
      title: '积分',
      dataIndex: 'credits',
    }, {
      title: '排名',
      dataIndex: 'order',
    }];

    const tops = range(0,Math.min(MAX_TOP_LIST_LENGTH, requesterCreditBoard.users.length)).map(i => ({username: requesterCreditBoard.users[i].username, value: requesterCreditBoard.users[i].credits}));
    return <div>
        <MinorTitle>
          <LocaleMessage id={"leaderboard.topBoard"}/>
        </MinorTitle>
        <LeaderboardLineChart data={tops}/>
        <MinorTitle>
          <LocaleMessage id={"leaderboard.rankListBoard"}/>
        </MinorTitle>
        <Table rowKey={"order"} dataSource={requesterCreditBoard.users} columns={columns}/>
      </div>

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
