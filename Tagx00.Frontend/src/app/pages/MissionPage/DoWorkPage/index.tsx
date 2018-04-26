import React from "react";
import { ImageWorkPage } from "./image/ImageWorkPage";
import { observer } from "mobx-react";
import { RouterStore } from "../../../stores/RouterStore";
import { Localize } from "../../../internationalization/components";
import { Inject } from "react.di";
import { WorkerService } from "../../../api/WorkerService";
import { MissionService } from "../../../api/MissionService";
import { InstanceDetail } from "../../../models/instance/InstanceDetail";
import { MissionDetail, MissionType } from "../../../models/mission/Mission";

interface Props {
  instanceDetail: InstanceDetail;
  missionDetail: MissionDetail;
  token: string;
  readonly: boolean;
}

@observer
export class DoWorkPage extends React.Component<Props, any> {

  @Inject routerStore: RouterStore;
  @Inject workerService: WorkerService;
  @Inject missionService: MissionService;

  render() {
    const {instanceDetail, missionDetail} = this.props;
    if (missionDetail.publicItem.missionType === MissionType.IMAGE) {
      return<ImageWorkPage instanceDetail={instanceDetail as any}
                                 missionDetail={missionDetail as any}
                                 token={this.props.token}
                                 jumpBack={() => this.routerStore.jumpTo("/missions")}
                                 readonlyMode={this.props.readonly}
        />
    }
    return null;
  }
}
