import React from "react";
import { Spin } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import { MissionCardPane } from "../../components/MyMission/MissionCardPane";
import { missionService } from "../../api/MissionService";
import { workerService } from "../../api/WorkerService";
import { AsyncComponent } from "../../router/AsyncComponent";
import { inject, observer } from "mobx-react";
import { STORE_USER } from "../../constants/stores";

const spin = <Spin size="large"/>;

@inject(STORE_USER)
@observer
export class MissionsPage extends React.Component<any, any> {

  renderList = async () => {
    const instances = await workerService.getAllInstances(this.props[STORE_USER].token);
    return <MissionCardPane items={instances}/>;
  };

  render() {
    return <div>
      <h1><LocaleMessage id={"selfCenter.myMissions.title"}/></h1>
      <AsyncComponent render={this.renderList} componentWhenLoading={spin}/>
    </div>
  }
}
