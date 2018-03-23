import React from "react";
import { ImageWorkPage } from "./image/ImageWorkPage";
import { workerService } from "../../api/WorkerService";
import { inject, observer } from "mobx-react";
import { STORE_USER } from "../../constants/stores";
import { UserStoreProps } from "../../stores/UserStore";
import { AsyncComponent } from "../../router/AsyncComponent";
import { ImageInstanceDetail } from "../../models/instance/image/ImageInstanceDetail";
import { missionService } from "../../api/MissionService";

interface Props extends UserStoreProps {
  missionId: number;
}

@inject(STORE_USER)
@observer
export class DoWorkPage extends React.Component<Props, any> {

  renderTruePage = async () => {
    const userStore = this.props[STORE_USER];
    const instanceDetail = await workerService.getInstanceDetail(this.props.missionId, userStore.token);

    const missionDetail = await missionService.getAMission(this.props.missionId);


    return <ImageWorkPage instanceDetail={instanceDetail} missionDetail={missionDetail}/>



  };

  render() {
    const userStore = this.props[STORE_USER];
    if (userStore.loggedIn) {
      return <AsyncComponent render={this.renderTruePage}/>
    } else {
      return "log in first";
    }
  }
}
