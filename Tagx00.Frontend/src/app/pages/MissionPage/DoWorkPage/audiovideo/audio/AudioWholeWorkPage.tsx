import React from 'react';
import { AudioNotation, AudioWorkPageProps, AudioWorkPageState } from "./shared";
import { AudioWholeJob } from "../../../../../models/instance/audio/job/AudioWholeJob";
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { AudioMissionType } from "../../../../../models/mission/audio/AudioMission";
import { toJS } from "mobx";
import { TagDescriptionTuple } from "../../../../../models/instance/TagTuple";
import { WorkPageLayout } from "../../WorkPageLayout";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { AudioMissionTipCard } from "../../../../../components/Mission/MissionTipCard/AudioMissionTipCard";
import { TagDescriptionTuplePanel } from "../../../../../components/ImageWork/TagDescriptionPanel";
import { ProgressController } from "../../../../../components/ImageWork/ProgressController";
import { AudioWorkPageLayout } from "./AudioWorkPageLayout";

function initializeNotation(notation: AudioNotation<AudioWholeJob>) {
  if (!(notation.job && notation.job.tuple)) {
    notation.job = {
      type: AudioMissionType.WHOLE,
      tuple: {
        tagTuples: [],
        descriptions: []
      }
    };
  }
  return notation;
}

interface Props extends AudioWorkPageProps<AudioWholeJob> {

}

export class AudioWholeWorkPage extends React.Component<Props, AudioWorkPageState<AudioWholeJob>> {

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
    return <AudioWorkPageLayout>
      <>
        <AudioPlayer url={this.props.notation.audioUrl}/>
      </>
      <>
        <AudioMissionTipCard audioMissionType={job.type}
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
        <ProgressController {...this.props.controllerProps}
                            goNext={this.goNext}
                            readonlyMode={this.props.readonlyMode}
                            saveProgress={this.submit}
        />
      </>
    </AudioWorkPageLayout>
  }
}
