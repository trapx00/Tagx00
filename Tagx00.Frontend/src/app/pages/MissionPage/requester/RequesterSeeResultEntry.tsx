import React from 'react';
import { Inject } from "react.di";
import { WorkerService } from "../../../api/WorkerService";
import { MissionService } from "../../../api/MissionService";
import { UserStore } from "../../../stores/UserStore";
import { DoWorkPage } from "../DoWorkPage";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Loading } from "../../../components/Common/Loading";

interface Props {
  instanceId: string;
}

export class RequesterSeeResultEntry extends React.Component<Props, {}> {
  @Inject workerService: WorkerService;
  @Inject missionService: MissionService;
  @Inject userStore: UserStore;

  renderContent = async () => {
    const token = this.userStore.token;
    const instanceDetail = await this.workerService.getInstanceDetail(this.props.instanceId, token);
    const missionDetail = await this.missionService.getAMission(instanceDetail.instance.missionId, token);
    return <DoWorkPage instanceDetail={instanceDetail} missionDetail={missionDetail} token={token} readonly={true}/>
  };

  render() {
    return <AsyncComponent render={this.renderContent} componentWhenLoading={<Loading/>}/>;
  }
}
