import React from 'react';
import { ThreeDimensionMissionType } from "../../../../models/mission/3d/3dMission";
import { ThreeDimensionWholeJob } from "../../../../models/instance/3d/job/3dWholeJob";
import { ThreeDimensionNotation, ThreeDimensionWorkPageProps, ThreeDimensionWorkPageState } from "./shared";
import { TagDescriptionTuple } from "../../../../models/instance/TagTuple";
import { toJS } from "mobx";
import { ThreeDimensionWorkPageLayout } from "./ThreeDimensionWorkPageLayout";
import { ProgressController } from "../../../../components/Mission/WorkPageSuite/ProgressController";
import { ThreeDimensionMissionTipCard } from "../../../../components/Mission/MissionTipCard/ThreeDimensionMissionTipCard";
import { ThreeDimensionPlayer } from "../../../../components/Mission/3DPlayer";
import { TagDescriptionTuplePanel } from "../../../../components/Mission/WorkPageSuite/TagDescriptionPanel";

function initializeNotation(notation: ThreeDimensionNotation<ThreeDimensionWholeJob>) {
  if (!(notation.job && notation.job.tuple)) {
    notation.job = {
      type: ThreeDimensionMissionType.WHOLE,
      tuple: {
        tagTuples: [],
        descriptions: []
      }
    };
  }
  return notation;
}

interface Props extends ThreeDimensionWorkPageProps<ThreeDimensionWholeJob> {

}

export class ThreeDimensionWholeWorkPage extends React.Component<Props, ThreeDimensionWorkPageState<ThreeDimensionWholeJob>> {

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

  saveProgress = () => {
    console.log(toJS(this.state.notation));
    this.props.submit(this.state.notation);
  };

  render() {
    const { missionDetail } = this.props;
    const { notation } = this.state;
    const { job } = notation;
    return <ThreeDimensionWorkPageLayout
      next={this.goNext}
      previous={this.props.controllerProps.goPrevious}
      saveProgress={this.saveProgress}

    >
      <>
        <ThreeDimensionPlayer token={this.props.notation.token}/>
      </>
      <>
        <ThreeDimensionMissionTipCard audioMissionType={job.type}
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
                            saveProgress={this.saveProgress}
        />
      </>
    </ThreeDimensionWorkPageLayout>
  }
}
