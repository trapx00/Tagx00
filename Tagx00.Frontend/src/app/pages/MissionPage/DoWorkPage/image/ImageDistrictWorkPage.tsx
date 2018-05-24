import React from "react";
import { ImageNotation } from "./ImageWorkStore";
import { toJS } from "mobx";
import { TagDescriptionTuple } from "../../../../models/instance/TagTuple";
import { MissionTipCard } from "../../../../components/ImageWork/MissionTipCard";
import { ProgressController } from "../../../../components/ImageWork/ProgressController";
import { TagDescriptionTuplePanel } from "../../../../components/ImageWork/TagDescriptionPanel";
import { ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { DistrictJob, DistrictTagDescriptionTuple } from "../../../../models/instance/image/job/DistrictJob";
import { DistrictPanel } from "../../../../components/ImageWork/DrawingPad/DistrictPanel";
import { DistrictAddingModeController } from "../../../../components/ImageWork/DistrictAddingModeController";
import { DistrictDrawingSession } from "../../../../components/ImageWork/DrawingPad/DistrictPanel/DistrictCanvas/DistrictDrawingSession";
import { District } from "../../../../components/ImageWork/DrawingPad/DistrictPanel/Districts";
import { ImageWorkPageProps, ImageWorkPageStates } from "./shared";
import { ImageWorkPageLayout } from "./ImageWorkPageLayout";

function initializeNotation(notation: ImageNotation<DistrictJob>) {
  if (!(notation.job && notation.job.tuples)) {
    notation.job = {
      type: ImageMissionType.DISTRICT,
      tuples: []
    };
  }
  return notation;
}


export class ImageDistrictWorkPage extends React.Component<ImageWorkPageProps<DistrictJob>, ImageWorkPageStates<DistrictJob>> {

  scale = 1;

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
        selectedIndex: -1,
        addingMode: false
      }
    } else {
      return null;
    }
  }

  get selectedTuple() {
    if (this.state.selectedIndex >= 0 && this.state.selectedIndex < this.state.notation.job.tuples.length) {
      return this.state.notation.job.tuples[this.state.selectedIndex];
    } else {
      return null;
    }
  }

  submit = () => {
    console.log(toJS(this.state.notation));
    this.props.submit(this.state.notation);
  };

  onTupleCreated = (tuple: DistrictTagDescriptionTuple) => {
    this.state.notation.job.tuples = this.state.notation.job.tuples.concat([tuple]);
    this.setState({
      selectedIndex: this.state.notation.job.tuples.length -1,
      addingMode: false
    });
  };

  onTupleChanged = (tuple: TagDescriptionTuple) => {
    this.selectedTuple.tagDescriptionTuple = tuple;
    this.forceUpdate();
  };

  startAdding = () => {
    this.setState({
      selectedIndex: -1,
      addingMode: true
    });
  };


  onDistrictComplete = (dis: District) => {

    this.onTupleCreated({
      boundaries: dis.boundaries,
      tagDescriptionTuple: {
        tagTuples: [],
        descriptions: []
      }
    })
  };

  onTupleSelected = (tuple: DistrictTagDescriptionTuple) => {
    this.setState({
      selectedIndex: this.state.notation.job.tuples.indexOf(tuple)
    });
  };

  removeSelected = () => {
    if (this.selectedTuple) {
      this.setState({
        notation: {
          ...this.state.notation,
          job: {
            ...this.state.notation.job,
            tuples: this.state.notation.job.tuples.filter(x => x !== this.selectedTuple)
          }
        }
      });
    }
  };

  goNext = () => {
    this.props.goNext(this.state.notation);
  };

  onImageLoaded = (width, height) => {
    this.setState({width, height});
  };

  setScale = (scale) => {
    this.scale = scale;
  };

  getScale = () => {
    return this.scale;
  };

  render() {
    const {imageUrl, job} = this.props.notation;

    const {missionDetail, readonlyMode} = this.props;

    const selectedTuple = this.selectedTuple;

    let session;
    if (this.state.addingMode) {
      session = new DistrictDrawingSession();
    }



    return <ImageWorkPageLayout imageUrl={imageUrl} imageWidth={this.state.width} imageHeight={this.state.height} setScale={this.setScale}>
          <>
            <DistrictPanel imageUrl={imageUrl}
                           tuples={this.state.notation.job.tuples}
                           addingMode={this.state.addingMode}
                           session={session}
                           onTupleSelected={this.onTupleSelected}
                           selectedTuple={selectedTuple}
                           onImageLoad={this.onImageLoaded}
                           getScale={this.getScale}
            />
        </>
        <>
          <MissionTipCard jobType={job.type}
                          tags={missionDetail.publicItem.allowedTags}
                          allowCustomTag={missionDetail.publicItem.allowCustomTag}
                          title={missionDetail.publicItem.title}
          />
          {readonlyMode ? null
            : <DistrictAddingModeController session={session} start={this.startAdding}
                                            addingMode={this.state.addingMode}
                                            onDistrictComplete={this.onDistrictComplete}
                                            onRemoveSelected={this.removeSelected}
            />
          }

          {selectedTuple
            ? <TagDescriptionTuplePanel tuple={selectedTuple.tagDescriptionTuple}
                                        readonlyMode={readonlyMode}
                                        onChange={this.onTupleChanged}
                                        allowedTags={missionDetail.publicItem.allowCustomTag ? null : missionDetail.publicItem.allowedTags}
            />
            : null}

          <ProgressController {...this.props.controllerProps}
                              goNext={this.goNext}
                              readonlyMode={readonlyMode}
                              saveProgress={this.submit}
          />
        </>
      </ImageWorkPageLayout>;
  }
}
