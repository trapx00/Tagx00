import React from 'react';
import { VideoNotation, VideoWorkPageProps, VideoWorkPageState } from "./shared";
import { VideoPartJob, VideoPartTuple } from "../../../../../models/instance/video/job/VideoPartJob";
import { VideoWholeJob } from "../../../../../models/instance/video/job/VideoWholeJob";
import { VideoMissionType } from "../../../../../models/mission/video/VideoMission";
import { toJS } from "mobx";
import { TagDescriptionTuple, TagTuple } from "../../../../../models/instance/TagTuple";
import { PartJobTuple } from "../../../../../models/instance/image/job/PartJob";
import { WorkPageLayout } from "../../WorkPageLayout";
import { VideoPlayer } from "../../../../../components/Mission/VideoPlayer";
import { MediaTupleList } from "../MediaTupleList";
import immer from "immer";
import { VideoMissionTipCard } from "../../../../../components/Mission/MissionTipCard/VideoMissionTipCard";
import { ProgressController } from "../../../../../components/Mission/WorkPageSuite/ProgressController";
import { VideoWorkPageLayout } from "./VideoWorkPageLayout";
import { TagDescriptionTuplePanel } from "../../../../../components/Mission/WorkPageSuite/TagDescriptionPanel";

function initializeNotation(notation: VideoNotation<VideoPartJob>) {
  if (!(notation.job && notation.job.tupleList)) {
    notation.job = {
      type: VideoMissionType.PART,
      tupleList: []
    };
  }
  return notation;
}

interface Props extends VideoWorkPageProps<VideoPartJob> {

}

interface State extends VideoWorkPageState<VideoPartJob> {
  selected: VideoPartTuple;
}

export class VideoPartWorkPage extends React.Component<Props, State> {

  state = {
    notation: initializeNotation(this.props.notation),
    selectedIndex: -1,
    selected: null,
    addingMode: false,
    width: 1,
    height: 1,
  };

  videoRef: VideoPlayer;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notation !== prevState.notation) {
      return {
        notation: initializeNotation(nextProps.notation),
        selected: null
      }
    } else {
      return null;
    }
  }

  saveProgress = () => {
    console.log(toJS(this.state.notation));
    this.props.submit(this.state.notation);
  };
  //
  // onVideoProgress = (offset: number) => {
  //   this.videoOffset = offset;
  // };

  onAddTuple = () => {
    this.state.notation.job.tupleList.push({
      startOffset: this.videoRef.currentTime,
      endOffset: this.videoRef.currentTime,
      tuple: {
        tagTuples: [],
        descriptions: []
      }
    });
    this.forceUpdate();
  };


  onRemoveTuple = (tuple: VideoPartTuple) => {
    this.state.notation.job.tupleList = this.state.notation.job.tupleList.filter(x => x !== tuple);
    this.forceUpdate();
  };

  onSelect = (tuple: VideoPartTuple) => {
    this.setState({selected: tuple});
  };

  onPlay = (tuple: VideoPartTuple) => {
    const video = this.videoRef;

    video.playRegion(tuple.startOffset, tuple.endOffset);
  };

  goNext = () => {
    this.props.goNext(this.state.notation);
  };

  onTupleChange = (tuple: TagDescriptionTuple) => {
    if (this.state.selected) {
      this.state.selected.tuple = tuple;
      this.forceUpdate();
    }
  };

  playOrPause = () => {
    this.videoRef.playOrPause();
  };

  setStartTime = (tuple: VideoPartTuple) => {
    tuple.startOffset = this.videoRef.currentTime;
    this.forceUpdate();
  };

  setEndTime = (tuple: VideoPartTuple) => {
    tuple.endOffset = this.videoRef.currentTime;
    this.forceUpdate();
  };

  setRef = (ref) => {
    this.videoRef = ref;
  };

  render() {

    const {missionDetail} = this.props;
    const {notation} = this.state;
    const {job} = notation;
    return <VideoWorkPageLayout
      saveProgress={this.saveProgress}
      previous={this.props.controllerProps.goPrevious}
      next={this.goNext}
      playOrPause={this.playOrPause}

    >
      <>
        <VideoPlayer url={this.props.notation.videoUrl}
          // onTimeChanged={this.onVideoProgress}
                     setRef={this.setRef}

        />
      </>
      <>
        <VideoMissionTipCard videoMissionType={job.type}
                             tagConfTuples={missionDetail.publicItem.tags.map(x => ({tag: x, confidence: 1}))}
                             allowCustomTag={missionDetail.publicItem.allowCustomTag}
                             title={missionDetail.publicItem.title}
        />
        <MediaTupleList tuples={this.state.notation.job.tupleList}
                        selected={this.state.selected}
                        onAdd={this.onAddTuple}
                        onSelect={this.onSelect}
                        onRemove={this.onRemoveTuple}
                        onPlay={this.onPlay}
                        onSetStartTime={this.setStartTime}
                        onSetEndTime={this.setEndTime}
                        readonly={this.props.readonlyMode}
        />
        {this.state.selected &&
        <TagDescriptionTuplePanel tuple={this.state.selected.tuple}
                                  onChange={this.onTupleChange}
                                  readonlyMode={this.props.readonlyMode}
                                  allowCustomTag={missionDetail.publicItem.allowCustomTag}
                                  tagConfTuples={missionDetail.publicItem.tags.map(x => ({tag: x, confidence: 1}))}
        />
        }
      </>
      <>
        <ProgressController {...this.props.controllerProps}
                            goNext={this.goNext}
                            readonlyMode={this.props.readonlyMode}
                            saveProgress={this.saveProgress}
        />
      </>
    </VideoWorkPageLayout>
  }
}
