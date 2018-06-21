import React from 'react';
import { MissionCardPane } from "./MissionCardPane";
import { WorkerService } from "../../../api/WorkerService";
import { Inject } from "react.di";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Loading } from "../../../components/Common/Loading";
import { RouteComponentProps } from "react-router";
import { Instance } from "../../../models/instance/Instance";
import { Filter } from "./Filter";
import { RouterStore } from "../../../stores/RouterStore";
import { MissionInstanceState } from "../../../models/instance/MissionInstanceState";
import { PagingInfo } from "../../../models/PagingInfo";

interface Props extends RouteComponentProps<any> {

}

interface State {
  loading: boolean;
  data: Instance[];
  pagingInfo: PagingInfo;
}


export default class WorkerMissionPanel extends React.Component<Props, State> {
  @Inject workerService: WorkerService;
  @Inject routerStore: RouterStore;

  get query(): MissionInstanceState[] {
    const states = this.routerStore.query["state"];

    const array = !states
      ? []
      : typeof states === 'string'
        ? [states]
        : states;
    return array.map(x=>MissionInstanceState[x]);
  }

  componentDidMount() {
    this.load();
  }

  load(page: number=1, pageSize: number=10) {
    this.setState({ loading: true});
    this.workerService.getAllInstances(this.query, page, pageSize).then((data) => {
      this.setState({
        loading: false,
        data: data.instances,
        pagingInfo: data.pagingInfo
      });
    });
  }

  state = {
    loading: true,
    data: [],
    pagingInfo: { totalCount: 0, pageSize: 10, currentPage: 0, totalPage: 0}
  };

  refresh = () => {
    this.load();
  };

  onPageChange = (page: number, pageSize: number) => {
    this.load(page, pageSize);
  };

  filter = (states: MissionInstanceState[]) => {
    this.routerStore.jumpTo(`/mission/worker?` + states.map(x => "state="+x).join("&"));
  };

  render() {


    return <div>
      <Filter states={this.query.map(x => MissionInstanceState[x])} onChange={this.filter}/>
      <MissionCardPane loading={this.state.loading}
        onPageChange={this.onPageChange}
        paging={this.state.pagingInfo}
        items={this.state.data}
        refresh={this.refresh}
      />
    </div>;
  }
}
