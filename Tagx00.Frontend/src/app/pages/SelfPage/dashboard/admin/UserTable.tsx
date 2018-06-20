import React from 'react';
import { Table } from 'antd';
import { UserRole } from "../../../../models/user/User";
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { Inject } from "react.di";
import { AdminService } from "../../../../api/AdminService";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { LocaleMessage } from "../../../../internationalization/components";
import { RouterStore } from "../../../../stores/RouterStore";
import { UserStore } from "../../../../stores/UserStore";
import { Loading } from "../../../../components/Common/Loading";

interface Props {

}

const ID_PREFIX= "admin.userChart.table.";

export class UserTable extends React.Component<Props, {}> {

  @Inject adminService: AdminService;

  @Inject localeStore: LocaleStore;

  @Inject routerStore: RouterStore;

  @Inject userStore: UserStore;

  toProfile(username: string, role: UserRole) {
    this.userStore.jumpToProfile(username, role);
  }

  get(id: string) {
    return this.localeStore.get(ID_PREFIX+id);
  }

  renderTable = async () => {


    const data = await this.adminService.getUsers();
    const columns = [{
      title: this.get("username"),
      dataIndex: 'username',
      key: 'id',
      sorter: true,
      render: (item, record) => <a onClick={() => this.toProfile(item, record.role)}>{item}</a>
    },
      {
        title: this.get('email'),
        dataIndex: "email",
        key: 'email',
        sorter: true,
      },
      {
        title: this.get("registerDate"),
        dataIndex: "registerDate",
        key: "registerDate",
        sorter:true
      }
      ];

    const requesterColumns = columns.concat(
      ["submittedMissionCount",
        "instanceCount",
      ]
        .map(x => ({title: this.get("requester."+x), dataIndex: x, key: x,sorter: true,})));
    const workerColumns = columns.concat(
      [
        "credits",
        "exp",
        "level",
      ].map(x => ({title: this.get("worker."+x), dataIndex: x, key: x,sorter: true,})));

    return <div>
      <h2><LocaleMessage id={ID_PREFIX+"requester.title"}/></h2>
      <Table columns={requesterColumns} dataSource={data.filter(x => x.role === UserRole.ROLE_REQUESTER)}/>
      <h2><LocaleMessage id={ID_PREFIX+"worker.title"}/></h2>
      <Table columns={workerColumns} dataSource={data.filter(x => x.role === UserRole.ROLE_WORKER)}/>
    </div>
  };

  render() {

    return <AsyncComponent render={this.renderTable} componentWhenLoading={<Loading/>}/>;
  }
}
