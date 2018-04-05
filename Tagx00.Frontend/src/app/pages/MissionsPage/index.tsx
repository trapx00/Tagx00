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
import { UserStore} from "../../stores/UserStore";
import { UserRole } from "../../models/User";
import { ImageMissionCreateInfoForm } from "../../components/MissionCreate/ImageMissionCreateInfoForm";
import { ImageMissionCreatePage } from "./ImageMissionCreatePage";
import { Inject } from "react.di";


@observer
export class MissionsPage extends React.Component<{}, {}> {

  @Inject userStore: UserStore;

  renderList = async () => {
    const instances = await workerService.getAllInstances(this.userStore.token);
    return <MissionCardPane items={instances}/>;

  };

  render() {

    if (this.userStore.loggedIn) {
      console.log(this.userStore.user.role);
      if (this.userStore.user.role === UserRole.ROLE_REQUESTER) {
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
