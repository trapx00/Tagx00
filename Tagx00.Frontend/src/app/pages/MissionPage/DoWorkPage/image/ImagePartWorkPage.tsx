import React from "react";
import { ImageNotation } from "../../../../stores/ImageWorkStore";
import { PartJob, PartJobTuple } from "../../../../models/instance/image/job/PartJob";
import { toJS } from "mobx";
import { TagDescriptionTuple } from "../../../../models/instance/TagTuple";
import { MissionTipCard } from "../../../../components/ImageWork/MissionTipCard";
import { ProgressController } from "../../../../components/ImageWork/ProgressController";
import { TagDescriptionTuplePanel } from "../../../../components/ImageWork/TagDescriptionPanel/index";
import { RectanglePanel } from "../../../../components/ImageWork/DrawingPad/RectanglePanel/index";
import { ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { PartAddingModeController } from "../../../../components/ImageWork/Part/PartAddingModeController/index";
import { ImageWorkPageLayout } from "./Layout";
import { ImageWorkPageProps, ImageWorkPageStates } from "./shared";


function initializeNotation(notation: ImageNotation<PartJob>) {
  if (!(notation.job && notation.job.tuples)) {
    notation.job = {
      type: ImageMissionType.PART,
      tuples: []
    };
  }
  return notation;
}

export class ImagePartWorkPage extends React.Component<ImageWorkPageProps<PartJob>, ImageWorkPageStates<PartJob>> {

  scale: 1;

  state = {
    notation: initializeNotation(this.props.notation),
    selectedIndex: -1,
    addingMode: false,
    width: 1,
    height: 1,
  };

  static getDerivedSttateFromProps(nextProps, prevState) {
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

  onTupleCreated = (tuple: PartJobTuple) => {
    this.state.notation.job.tuples = this.state.notation.job.tuples.concat([tuple]);
    this.setState({
      selectedIndex: this.state.notation.job.tuples.length - 1,
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

  onTupleSelected = (tuple: PartJobTuple) => {
    this.setState({
      selectedIndex: this.state.notation.job.tuples.indexOf(tuple)
    });
  };

  removeSelected = () => {
    if (this.state.selectedIndex >= 0) {
      this.state.notation.job.tuples = this.state.notation.job.tuples.filter(x => x !== this.selectedTuple);
      this.forceUpdate();
    }
  };

  getScale = () => {
    return this.scale;
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

  render() {
    const {imageUrl, job} = this.props.notation;

    const {missionDetail, controllerProps, readonlyMode} = this.props;
    const selectedTuple = this.selectedTuple;
    return <ImageWorkPageLayout imageUrl={imageUrl} imageHeight={this.state.height} imageWidth={this.state.width} setScale={this.setScale}>
        <>
          <RectanglePanel imageUrl={imageUrl}
                          tuples={this.state.notation.job.tuples}
                          onDrawComplete={this.onTupleCreated}
                          addingMode={this.state.addingMode}
                          onTupleSelected={this.onTupleSelected}
                          selectedTuple={selectedTuple}
                          onImageLoaded={this.onImageLoaded}
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
            :
            <PartAddingModeController start={this.startAdding}
                                      addingMode={this.state.addingMode}
                                      removeSelected={this.removeSelected}/>
          }
          {selectedTuple
            ? <TagDescriptionTuplePanel tuple={selectedTuple.tagDescriptionTuple}
                                        readonlyMode={readonlyMode}
                                        onChange={this.onTupleChanged}/>
            : null}

          <ProgressController {...this.props.controllerProps}
                              goNext={this.goNext}
                              readonlyMode={this.props.readonlyMode}
                              saveProgress={this.submit}
          />
        </>
      </ImageWorkPageLayout>;
  }
}
