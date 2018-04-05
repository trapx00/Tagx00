import React from "react";
import { LocaleMessage } from "../../internationalization/components";
import { MissionCardPane } from "../../components/MyMission/MissionCardPane";
import { MissionService } from "../../api/MissionService";
import { WorkerService } from "../../api/WorkerService";
import { AsyncComponent } from "../../router/AsyncComponent";
import { observer } from "mobx-react";
import { Loading } from "../../components/Common/Loading";
import { UserStore } from "../../stores/UserStore";
import { UserRole } from "../../models/User";
import { ImageMissionCreatePage } from "./ImageMissionCreatePage";
import { Inject } from "react.di";


@observer
export class MissionsPage extends React.Component<{}, {}> {

  @Inject userStore: UserStore;
  @Inject workerService: WorkerService;
  @Inject missionService: MissionService;

  renderList = async () => {
    const instances = await this.workerService.getAllInstances(this.userStore.token);
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
