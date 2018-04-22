import React from "react";
import {Table} from "antd";
import { Inject } from "react.di";
import { WorkerService } from "../../api/WorkerService";
import { UserStore } from "../../stores/UserStore";
import { DefinitionItem } from "../../components/DefinitionItem";
import { LocaleMessage } from "../../internationalization/components";
import { AsyncComponent } from "../../router/AsyncComponent";
import { UserRole } from "../../models/user/User";

export class WorkerExpBoardPage extends React.Component<{},{}> {

  @Inject workerService: WorkerService;
  @Inject userStore: UserStore;


  leaderboard = async () => {
    const selfRank = await this.workerService.getSpecificWorkerExpRank(this.userStore.user.username,this.userStore.token);
    const workerExpBoard = await this.workerService.getWorkerExpBoard(null,null,this.userStore.token);
    const columns =[{
      title: '用户名',
      dataIndex: 'username',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '积分',
      dataIndex: 'exp',
    }, {
      title: '等级',
      dataIndex: 'level',
    }, {
      title: '排名',
      dataIndex: 'order',
    }];
    if(this.userStore.user.role==UserRole.ROLE_WORKER)
      return (
        <div>
          <DefinitionItem prompt={ <LocaleMessage id={"leaderboard.selfRank"}/>}>
            {selfRank.workerExpSelfRank.order}
          </DefinitionItem>
          <br/>
          <h2>
            <LocaleMessage id={"leaderboard.rankListBoard"}/>
          </h2>
          <br/>
          <Table dataSource={workerExpBoard.expBoardList} columns={columns} pagination={workerExpBoard.pagingInfo} />
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
          <Table dataSource={workerExpBoard.expBoardList} columns={columns} pagination={workerExpBoard.pagingInfo} />
        </div>
      );
  }

  render() {
    return <div>
      <h1>
        <LocaleMessage id={"leaderboard.expBoard"}/>
      </h1>
      <br/><br/>
      <AsyncComponent render={this.leaderboard}/>
    </div>

  }
}