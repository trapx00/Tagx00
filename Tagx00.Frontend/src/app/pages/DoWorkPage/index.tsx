import React from "react";
import { ImageWorkPage } from "./ImageWorkPage";
import { workerService } from "../../api/WorkerService";
import { inject, observer } from "mobx-react";
import { STORE_USER } from "../../constants/stores";
import { UserStoreProps } from "../../stores/UserStore";
import { AsyncComponent } from "../../router/AsyncComponent";
import { ImageInstanceDetail } from "../../models/instance/image/ImageInstanceDetail";

interface Props extends UserStoreProps {
  missionId: number;
}

@inject(STORE_USER)
@observer
export class DoWorkPage extends React.Component<Props, any> {

  renderTruePage = async () => {
    const userStore = this.props[STORE_USER];
    const instanceDetail = await workerService.getInstanceDetail(this.props.missionId, userStore.token);


    return <ImageWorkPage detail={instanceDetail}/>



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
