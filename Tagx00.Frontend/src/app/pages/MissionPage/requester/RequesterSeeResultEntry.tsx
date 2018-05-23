import React from 'react';
import { Inject } from "react.di";
import { WorkerService } from "../../../api/WorkerService";
import { MissionService } from "../../../api/MissionService";
import { UserStore } from "../../../stores/UserStore";
import { DoWorkPage } from "../DoWorkPage";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Loading } from "../../../components/Common/Loading";
import { RequesterService } from "../../../api/RequesterService";

interface Props {
  instanceId: string;
}

export class RequesterSeeResultEntry extends React.Component<Props, {}> {
  @Inject requesterService: RequesterService;
  @Inject missionService: MissionService;

  renderContent = async () => {
    const instanceDetail = (await this.requesterService.getInstanceDetail(this.props.instanceId)).detail;
    const missionDetail = await this.missionService.getAMission(instanceDetail.instance.missionId);
    return <DoWorkPage instanceDetail={instanceDetail} missionDetail={missionDetail} readonly={true}/>
  };

  render() {
    return <AsyncComponent render={this.renderContent} componentWhenLoading={<Loading/>}/>;
  }
}
