import React from 'react';
import { VideoNotation, VideoWorkPageProps, VideoWorkPageState } from "./shared";
import { VideoWholeJob } from "../../../../../models/instance/video/job/VideoWholeJob";
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { VideoMissionType } from "../../../../../models/mission/video/VideoMission";
import { toJS } from "mobx";
import { TagDescriptionTuple } from "../../../../../models/instance/TagTuple";
import { WorkPageLayout } from "../../WorkPageLayout";
import { VideoPlayer } from "../../../../../components/Mission/VideoPlayer";
import { VideoMissionTipCard } from "../../../../../components/Mission/MissionTipCard/VideoMissionTipCard";
import { ProgressController } from "../../../../../components/Mission/WorkPageSuite/ProgressController";
import { VideoWorkPageLayout } from "./VideoWorkPageLayout";
import { TagDescriptionTuplePanel } from "../../../../../components/Mission/WorkPageSuite/TagDescriptionPanel";

function initializeNotation(notation: VideoNotation<VideoWholeJob>) {
  if (!(notation.job && notation.job.tuple)) {
    notation.job = {
      type: VideoMissionType.WHOLE,
      tuple: {
        tagTuples: [],
        descriptions: []
      }
    };
  }
  return notation;
}

interface Props extends VideoWorkPageProps<VideoWholeJob> {

}

export class VideoWholeWorkPage extends React.Component<Props, VideoWorkPageState<VideoWholeJob>> {

  state = {
    notation: initializeNotation(this.props.notation),
    selectedIndex: -1,
    addingMode: false,
    width: 1,
    height: 1,

  };

  videoRef: VideoPlayer;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notation !== prevState.notation) {
      return {
        notation: initializeNotation(nextProps.notation),
      }
    } else {
      return null;
    }
  }

  goNext = () => {
    this.props.goNext(this.state.notation);
  };

  onTupleChange = (tuple: TagDescriptionTuple) => {
    this.state.notation.job.tuple = tuple;
    this.forceUpdate();
  };

  saveProgress = () => {
    console.log(toJS(this.state.notation));
    this.props.submit(this.state.notation);
  };

  playOrPause = () => {
    this.videoRef.playOrPause();
  };

  setRef = (ref) => {
    this.videoRef = ref;
  };

  render() {
    const { missionDetail } = this.props;
    const { notation } = this.state;
    const { job } = notation;
    return <VideoWorkPageLayout
      saveProgress={this.saveProgress}
      previous={this.props.controllerProps.goPrevious}
      next={this.goNext}
      playOrPause={this.playOrPause}
    >
      <>
        <VideoPlayer url={this.props.notation.videoUrl}
        setRef={this.setRef}
        />
      </>
      <>
        <VideoMissionTipCard videoMissionType={job.type}
                             tags={missionDetail.publicItem.tags}
                             allowCustomTag={missionDetail.publicItem.allowCustomTag}
                             title={missionDetail.publicItem.title}
        />
        <TagDescriptionTuplePanel tuple={job.tuple}
                                  onChange={this.onTupleChange}
                                  readonlyMode={this.props.readonlyMode}
                                  allowCustomTag={missionDetail.publicItem.allowCustomTag}
                                  tags={missionDetail.publicItem.tags}
        />
        <>
        </>
        <ProgressController {...this.props.controllerProps}
                            goNext={this.goNext}
                            readonlyMode={this.props.readonlyMode}
                            saveProgress={this.saveProgress}
        />
      </>
    </VideoWorkPageLayout>
  }
}
