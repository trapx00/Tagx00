import React from "react";
import { WorkerService } from "../../../api/WorkerService";
import { UserStore } from "../../../stores/UserStore";
import { Inject } from "react.di";
import { DefinitionItem } from "../../../components/DefinitionItem/index";
import { LocaleMessage } from "../../../internationalization/components/index";
import { AsyncComponent } from "../../../router/AsyncComponent";
import {Table} from "antd";

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
    return (
      <div>
        <DefinitionItem prompt={"我的排名"} children={selfRank.workerCreditSelfRank.order}/>
        <h2>总排行榜</h2>
        <Table dataSource={workerCreditBoard.creditBoardList} columns={columns} pagination={workerCreditBoard.pagingInfo} />
      </div>
    );
  }

  render() {
    return <div>
      <h1>
        <LocaleMessage id={"积分排行榜"}/>
      </h1>
      <AsyncComponent render={this.leaderboard}/>
    </div>

  }

}