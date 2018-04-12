import React from 'react';
import { MissionCardPane } from "./MissionCardPane";
import { WorkerService } from "../../../api/WorkerService";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Loading } from "../../../components/Common/Loading";

interface Props {

}


export class WorkerMissionPanel extends React.Component<Props, {}> {
  @Inject workerService: WorkerService;
  @Inject userStore: UserStore;

  renderList = async () => {
    const instances = await this.workerService.getAllInstances(this.userStore.token);
    return <MissionCardPane items={instances}/>;

  };

  render() {
    return <AsyncComponent render={this.renderList} componentWhenLoading={<Loading/>}/>
  }
}
