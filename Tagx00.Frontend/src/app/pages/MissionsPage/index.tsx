import React from "react";
import { Spin } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import { MissionCardPane } from "../../components/MyMission/MissionCardPane";
import { missionService } from "../../api/MissionService";
import { workerService } from "../../api/WorkerService";
import { AsyncComponent } from "../../router/AsyncComponent";
import { inject, observer } from "mobx-react";
import { STORE_USER } from "../../constants/stores";
import { Loading } from "../../components/Common/Loading";
import { UserStoreProps } from "../../stores/UserStore";
import { UserRole } from "../../models/User";
import { ImageMissionCreateInfoForm } from "../../components/MissionCreate/ImageMissionCreateInfoForm";
import { ImageMissionCreatePage } from "./ImageMissionCreatePage";



@inject(STORE_USER)
@observer
export class MissionsPage extends React.Component<UserStoreProps, {}> {

  renderList = async () => {
    const instances = await workerService.getAllInstances();
    return <MissionCardPane items={instances}/>;

  };

  render() {
    const store = this.props[STORE_USER];

    if (store.loggedIn) {
      if (store.user.role === UserRole.Requester) {
        return <ImageMissionCreatePage/>;
      } else {
        return <div>
          <h1><LocaleMessage id={"selfCenter.myMissions.title"}/></h1>
          <AsyncComponent render={this.renderList} componentWhenLoading={<Loading/>}/>
        </div>;
      }

    } else {
      return "login first";
    }
  }
}
