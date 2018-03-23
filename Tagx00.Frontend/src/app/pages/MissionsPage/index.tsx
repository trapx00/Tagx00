import React from "react";
import { Spin } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import { MissionCardPane } from "../../components/MyMission/MissionCardPane";
import { missionService } from "../../api/MissionService";
import { workerService } from "../../api/WorkerService";
import { AsyncComponent } from "../../router/AsyncComponent";

const spin = <Spin size="large" />;

export class MissionsPage extends React.Component<any, any> {

  renderList = async () => {
    const instances = await workerService.getAllInstances();
    return <MissionCardPane items={instances}/>;
  };

  render() {
    return  <div>
      <h1><LocaleMessage id={"selfCenter.myMissions.title"}/></h1>
      <AsyncComponent render={this.renderList} componentWhenLoading={spin}/>
    </div>
  }
}
