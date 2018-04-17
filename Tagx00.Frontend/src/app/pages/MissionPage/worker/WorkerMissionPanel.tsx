import React from 'react';
import { MissionCardPane } from "./MissionCardPane";
import { WorkerService } from "../../../api/WorkerService";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Loading } from "../../../components/Common/Loading";
import { waitForMs } from "../../../../utils/Wait";

interface Props {

}

interface State {
  key: number;
}


export class WorkerMissionPanel extends React.Component<Props, State> {
  @Inject workerService: WorkerService;
  @Inject userStore: UserStore;

  state = {
    key: 0
  };

  refresh = () => {
    this.setState(prev => ({key: prev.key +1}));
  };


  renderList = async () => {
    const instances = await this.workerService.getAllInstances(this.userStore.token);
    return <MissionCardPane items={instances} refresh={this.refresh} />;

  };

  render() {
    return <AsyncComponent key={this.state.key} render={this.renderList} componentWhenLoading={<Loading/>}/>
  }
}
