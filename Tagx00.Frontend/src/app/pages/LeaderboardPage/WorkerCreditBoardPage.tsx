import React from "react";
import { Inject } from "react.di";
import { WorkerService } from "../../api/WorkerService";
import { UserStore } from "../../stores/UserStore";
import { UserRole } from "../../models/user/User";
import { DefinitionItem } from "../../components/DefinitionItem";
import { Table } from "antd";
import { LocaleMessage } from "../../internationalization/components";
import { AsyncComponent } from "../../router/AsyncComponent";

export class WorkerCreditBoardPage extends React.Component<{},{}> {
  @Inject workerService: WorkerService;
  @Inject userStore: UserStore;

  leaderboard = async () => {
    const selfRank = await this.workerService.getSpecificWorkerCreditRank(this.userStore.user.username,this.userStore.token);
    const workerCreditBoard = await this.workerService.getWorkerCreditBoard(null,null,this.userStore.token);
    const columns =[{
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
    if(this.userStore.user.role == UserRole.ROLE_WORKER)
      return (
        <div>
          <DefinitionItem prompt={"我的排名"} children={selfRank.workerCreditSelfRank.order}/>
          <br/>
          <h2>总排行榜</h2>
          <br/>
          <Table dataSource={workerCreditBoard.creditBoardList} columns={columns} pagination={workerCreditBoard.pagingInfo} />
        </div>
      );
    else
      return (
        <div>
          <br/>
          <h2>总排行榜</h2>
          <br/>
          <Table dataSource={workerCreditBoard.creditBoardList} columns={columns} pagination={workerCreditBoard.pagingInfo} />
        </div>
      );
  };

  render() {
    return <div>
      <h1>
        <LocaleMessage id={"积分排行榜"}/>
      </h1>
      <br/><br/>
      <AsyncComponent render={this.leaderboard}/>
    </div>

  }

}