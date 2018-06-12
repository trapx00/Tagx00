import React from 'react';
import { AudioWorkPageController, KnownAudioJob } from "./AudioWorkPageController";
import { RootWorkPageProps, WorkPage, WorkPageProps } from "../../WorkPage";
import { AudioMissionDetail, AudioMissionType } from "../../../../../models/mission/audio/AudioMission";
import { AudioInstanceDetail } from "../../../../../models/instance/audio/AudioInstanceDetail";
import { AudioJob } from "../../../../../models/instance/audio/job/AudioJob";
import { AudioNotation } from "./shared";
import { AudioPartWorkPage } from "./AudioPartWorkPage";
import { AudioWholeWorkPage } from "./AudioWholeWorkPage";
import { observer } from "mobx-react";


interface Props extends RootWorkPageProps<AudioMissionDetail, AudioInstanceDetail> {

}

@observer
export class AudioWorkPage extends React.Component<Props, {}> {

  controller = new AudioWorkPageController(this.props.missionDetail, this.props.instanceDetail);

  chooseWorkPage = (context: WorkPageProps<AudioMissionDetail, AudioJob, AudioNotation<AudioJob>>) => {
    switch (context.notation.job.type) {
      case AudioMissionType.WHOLE:
        return <AudioWholeWorkPage {...context as any}/>;
      case AudioMissionType.PART:
        return <AudioPartWorkPage {...context as any}/>;
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
