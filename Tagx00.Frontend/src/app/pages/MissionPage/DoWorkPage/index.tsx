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
import { AudioWorkPage } from "./audiovideo/audio/AudioWorkPage";
import { VideoWorkPage } from "./audiovideo/video/VideoWorkPage";

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

    const props = {
      instanceDetail,
      missionDetail,
      jumpBack: this.jumpBack,
      readonlyMode: this.props.readonly
    };

    switch (missionDetail.publicItem.missionType) {
      case MissionType.IMAGE:
        return <ImageWorkPage {...props as any}/>;
      case MissionType.TEXT:
        return <TextWorkPage {...props as any}/>;
      case MissionType.AUDIO:
        return <AudioWorkPage {...props as any}/>;
      case MissionType.VIDEO:
        return <VideoWorkPage {...props as any}/>
    }
    return null;
  }
}
