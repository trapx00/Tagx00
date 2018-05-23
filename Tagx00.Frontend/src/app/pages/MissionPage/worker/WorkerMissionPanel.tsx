import React from 'react';
import { MissionCardPane } from "./MissionCardPane";
import { WorkerService } from "../../../api/WorkerService";
import { Inject } from "react.di";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Loading } from "../../../components/Common/Loading";

interface Props {

}

interface State {
  key: number;
}


export default class WorkerMissionPanel extends React.Component<Props, State> {
  @Inject workerService: WorkerService;

  state = {
    key: 0
  };

  refresh = () => {
    this.setState(prev => ({key: prev.key +1}));
  };


  renderList = async () => {
    const instances = await this.workerService.getAllInstances();
    return <MissionCardPane items={instances} refresh={this.refresh} />;

  };

  render() {
    return <AsyncComponent key={this.state.key} render={this.renderList} componentWhenLoading={<Loading/>}/>
  }
}
