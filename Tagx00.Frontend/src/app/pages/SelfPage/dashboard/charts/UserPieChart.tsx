import React from 'react';
import { UserInfo } from "../../../../models/userInfo/UserInfo";
import { WorkerInfo } from "../../../../models/userInfo/WorkerInfo";
import { RequesterInfo } from "../../../../models/userInfo/RequesterInfo";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { Inject } from "react.di";
import { Modal, Table } from 'antd';
import { PieChart } from "./PieChart";
import { ClickablePieChart } from "./ClickablePieChart";
import { User, UserRole } from "../../../../models/user/User";

const ID_PREFIX = "admin.userChart.";

interface Props {
  requesters: RequesterInfo[];
  workers: WorkerInfo[];
}

interface State {
}

export class UserPieChart extends React.Component<Props, State> {

  @Inject localeStore: LocaleStore;

  get = (id: string) => this.localeStore.get(ID_PREFIX + id) as string;


  onCancel = () => {
    this.setState({
      modalShown: false
    })
  };

  chartData = [
    {
      name: this.get("requester"),
      items: this.props.requesters as UserInfo[]
    },
    {
      name: this.get("worker"),
      items: this.props.workers as UserInfo[]
    }
  ];

  render() {


    console.log(this.props);

    return <div>
      <ClickablePieChart
        title={this.get("total") as string}
        items={this.chartData}
      />
    </div>
  }
}
