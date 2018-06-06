import React from 'react';
import { VideoNotation, VideoWorkPageProps, VideoWorkPageState } from "./shared";
import { VideoWholeJob } from "../../../../../models/instance/video/job/VideoWholeJob";
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { VideoMissionType } from "../../../../../models/mission/video/VideoMission";
import { toJS } from "mobx";
import { TagDescriptionTuple } from "../../../../../models/instance/TagTuple";
import { WorkPageLayout } from "../../WorkPageLayout";
import { VideoPlayer } from "./VideoPlayer";
import { VideoMissionTipCard } from "../../../../../components/Mission/MissionTipCard/VideoMissionTipCard";
import { TagDescriptionTuplePanel } from "../../../../../components/ImageWork/TagDescriptionPanel";
import { ProgressController } from "../../../../../components/ImageWork/ProgressController";
import { VideoWorkPageLayout } from "./VideoWorkPageLayout";

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

  submit = () => {
    console.log(toJS(this.state.notation));
    this.props.submit(this.state.notation);
  };

  render() {
    const { missionDetail } = this.props;
    const { notation } = this.state;
    const { job } = notation;
    return <VideoWorkPageLayout>
      <>
        <VideoPlayer url={this.props.notation.videoUrl}/>
      </>
      <>
        <VideoMissionTipCard videoMissionType={job.type}
                             tagConfTuples={missionDetail.publicItem.tags.map(x => ({tag: x, confidence: 1}))}
                             allowCustomTag={missionDetail.publicItem.allowCustomTag}
                             title={missionDetail.publicItem.title}
        />
        <TagDescriptionTuplePanel tuple={job.tuple}
                                  onChange={this.onTupleChange}
                                  readonlyMode={this.props.readonlyMode}
                                  allowCustomTag={missionDetail.publicItem.allowCustomTag}
                                  tagConfTuples={missionDetail.publicItem.tags.map(x => ({tag: x, confidence: 1}))}
        />
        <>
        </>
        <ProgressController {...this.props.controllerProps}
                            goNext={this.goNext}
                            readonlyMode={this.props.readonlyMode}
                            saveProgress={this.submit}
        />
      </>
    </VideoWorkPageLayout>
  }
}
