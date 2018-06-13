import React from 'react';
import { VideoWorkPageController, KnownVideoJob } from "./VideoWorkPageController";
import { RootWorkPageProps, WorkPage, WorkPageProps } from "../../WorkPage";
import { VideoMissionDetail, VideoMissionType } from "../../../../../models/mission/video/VideoMission";
import { VideoInstanceDetail } from "../../../../../models/instance/video/VideoInstanceDetail";
import { VideoJob } from "../../../../../models/instance/video/job/VideoJob";
import { VideoNotation } from "./shared";
import { VideoPartWorkPage } from "./VideoPartWorkPage";
import { VideoWholeWorkPage } from "./VideoWholeWorkPage";
import { observer } from "mobx-react";


interface Props extends RootWorkPageProps<VideoMissionDetail, VideoInstanceDetail> {

}

@observer
export class VideoWorkPage extends React.Component<Props, {}> {

  controller = new VideoWorkPageController(this.props.missionDetail, this.props.instanceDetail);

  chooseWorkPage = (context: WorkPageProps<VideoMissionDetail, VideoJob, VideoNotation<VideoJob>>) => {
    switch (context.notation.job.type) {
      case VideoMissionType.WHOLE:
        return <VideoWholeWorkPage {...context as any}/>;
      case VideoMissionType.PART:
        return <VideoPartWorkPage {...context as any}/>;
    }
  };


  render() {
    return <WorkPage
      controller={this.controller}
      chooseWorkPage={this.chooseWorkPage}
      jumpBack={this.props.jumpBack}
      readonlyMode={this.props.readonlyMode}
    />
  }
}
