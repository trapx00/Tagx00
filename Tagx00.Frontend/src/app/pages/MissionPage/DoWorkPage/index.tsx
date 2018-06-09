import React from "react";
import { ImageWorkPage } from "./image/ImageWorkPage";
import { observer } from "mobx-react";
import { RouterStore } from "../../../stores/RouterStore";
import { Inject } from "react.di";
import { WorkerService } from "../../../api/WorkerService";
import { MissionService } from "../../../api/MissionService";
import { InstanceDetail } from "../../../models/instance/InstanceDetail";
import { MissionType } from "../../../models/mission/Mission";
import { MissionDetail } from "../../../models/mission/MissionDetail";
import { TextWorkPage } from "./text/TextWorkPage";

interface Props {
  instanceDetail: InstanceDetail;
  missionDetail: MissionDetail;
  readonly: boolean;
}

@observer
export class DoWorkPage extends React.Component<Props, any> {

  @Inject routerStore: RouterStore;
  @Inject workerService: WorkerService;
  @Inject missionService: MissionService;

  jumpBack = () => {
    this.routerStore.jumpTo("/mission");
  };

  render() {
    const {instanceDetail, missionDetail} = this.props;
    switch (missionDetail.publicItem.missionType) {
      case MissionType.IMAGE:
        return <ImageWorkPage instanceDetail={instanceDetail as any}
                              missionDetail={missionDetail as any}
                              jumpBack={this.jumpBack}
                              readonlyMode={this.props.readonly}
        />;
      case MissionType.TEXT:
        return <TextWorkPage instanceDetail={instanceDetail as any}
                             missionDetail={missionDetail as any}
                             readonlyMode={this.props.readonly}
                             jumpBack={this.jumpBack}
        />
    }
    return null;
  }
}
