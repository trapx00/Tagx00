import React from "react";
import { Table } from "antd";
import { Inject } from "react.di";
import { RequesterService } from "../../api/RequesterService";
import { UserStore } from "../../stores/UserStore";
import { DefinitionItem } from "../../components/DefinitionItem";
import { LocaleMessage } from "../../internationalization/components";
import { AsyncComponent } from "../../router/AsyncComponent";
import { UserRole } from "../../models/user/User";

export class RequesterCreditBoardPage extends React.Component<{}, {}> {
  @Inject requesterService: RequesterService;
  @Inject userStore: UserStore;

  leaderboard = async () => {
    const selfRank = await this.requesterService.getSpecificRequesterRank(this.userStore.user.username, this.userStore.token);
    const requesterCreditBoard = await this.requesterService.getRequesterCreditBoard(null, null, this.userStore.token);
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
    if (this.userStore.user.role == UserRole.ROLE_REQUESTER)
      return (
        <div>
          <DefinitionItem prompt={<LocaleMessage id={"leaderboard.selfRank"}/>}>
            {selfRank.requesterCreditSelfRank.order}
          </DefinitionItem>
          <br/>
          <h2>
            <LocaleMessage id={"leaderboard.rankListBoard"}/>
          </h2>
          <br/>
          <Table dataSource={requesterCreditBoard.users} columns={columns}
                 pagination={requesterCreditBoard.pagingInfo}/>
        </div>
      );
    else
      return (
        <div>
          <br/>
          <h2>
            <LocaleMessage id={"leaderboard.rankListBoard"}/>
          </h2>
          <br/>
          <Table dataSource={requesterCreditBoard.users} columns={columns} pagination={requesterCreditBoard.pagingInfo}/>
        </div>
      );
  }

  render() {
    return <div>
      <h1>
        <LocaleMessage id={"leaderboard.requesterCredits"}/>
      </h1>
      <br/><br/>
      <AsyncComponent render={this.leaderboard}/>
    </div>

  }
}