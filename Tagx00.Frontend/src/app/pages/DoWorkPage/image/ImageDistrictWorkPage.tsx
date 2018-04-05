import React from "react";
import { ImageNotation } from "../../../stores/ImageWorkStore";
import { observer } from "mobx-react";
import { ImageWorkPageProps } from "./ImageWorkPage";
import { action, computed, observable, toJS } from "mobx";
import { Card, Col, Row } from 'antd';
import { TagDescriptionTuple } from "../../../models/instance/TagTuple";
import { MissionTipCard } from "../../../components/ImageWork/MissionTipCard";
import { ProgressController } from "../../../components/ProgressController";
import { TagDescriptionTuplePanel } from "../../../components/ImageWork/TagDescriptionPanel";
import { ImageMissionType } from "../../../models/mission/image/ImageMission";
import { DistrictJob, DistrictTagDescriptionTuple } from "../../../models/instance/image/job/DistrictJob";
import { DistrictPanel } from "../../../components/ImageWork/DrawingPad/DistrictPanel";
import { DistrictAddingModeController } from "../../../components/ImageWork/DistrictAddingModeController";
import { DistrictDrawingSession } from "../../../components/ImageWork/DrawingPad/DistrictPanel/DistrictCanvas/DistrictDrawingSession";
import { District } from "../../../components/ImageWork/DrawingPad/DistrictPanel/Districts";
import { ImageWorkPageLayout } from "./Layout";

@observer
export class ImageDistrictWorkPage extends React.Component<ImageWorkPageProps<DistrictJob>, any> {
  @observable notation: ImageNotation<DistrictJob> = this.props.notation;
  @observable selectedIndex: number = 1;
  @observable addingMode: boolean = false;
  @observable width: number = 1;
  @observable height: number = 1;
  @observable scale: number = 1;

  @computed get selectedTuple() {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.notation.job.tuples.length) {
      return this.notation.job.tuples[this.selectedIndex];
    } else {
      return null;
    }
  }


  constructor(props) {
    super(props);
    if (!(this.notation.job && this.notation.job.tuples)) {
      this.notation.job = {
        type: ImageMissionType.DISTRICT,
        tuples: []
      };
    }
  }

  submit = () => {
    console.log(toJS(this.notation));
    this.props.submit(this.notation);
  };

  @action onTupleCreated = (tuple: DistrictTagDescriptionTuple) => {
    this.notation.job.tuples = this.notation.job.tuples.concat([tuple]);
    this.selectedIndex = this.notation.job.tuples.length - 1;
    this.addingMode = false;
  };

  @action onTupleChanged = (tuple: TagDescriptionTuple) => {
    this.selectedTuple.tagDescriptionTuple = tuple;
  };

  @action startAdding = () => {
    this.selectedIndex = -1;
    this.addingMode = true;
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

  @action onTupleSelected = (tuple: DistrictTagDescriptionTuple) => {
    this.selectedIndex = this.notation.job.tuples.indexOf(tuple);
  };

  @action removeSelected = () => {
    if (this.selectedTuple) {
      this.notation.job.tuples = this.notation.job.tuples.filter(x => x !== this.selectedTuple);
    }

  };

  goNext = () => {
    this.props.goNext(this.notation);
  };

  @action onImageLoaded = (width, height) => {
    this.width = width;
    this.height = height;
  };

  @action setScale = (scale) => {
    this.scale = scale;
  };

  getScale = () => {
    return this.scale;
  };

  render() {
    const {imageUrl, job} = this.props.notation;

    const {missionDetail, controllerProps, readonlyMode} = this.props;
    const selectedTuple = this.selectedTuple;

    let session;
    if (this.addingMode) {
      session = new DistrictDrawingSession();
    }

    return <ImageWorkPageLayout imageWidth={this.width} imageHeight={this.height} setScale={this.setScale}>
          <>
            <DistrictPanel imageUrl={imageUrl}
                           tuples={this.notation.job.tuples}
                           addingMode={this.addingMode}
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
                                            addingMode={this.addingMode}
                                            onDistrictComplete={this.onDistrictComplete}
                                            onRemoveSelected={this.removeSelected}
            />
          }

          {selectedTuple
            ? <TagDescriptionTuplePanel tuple={selectedTuple.tagDescriptionTuple}
                                        readonlyMode={readonlyMode}
                                        onChange={this.onTupleChanged}/>
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
