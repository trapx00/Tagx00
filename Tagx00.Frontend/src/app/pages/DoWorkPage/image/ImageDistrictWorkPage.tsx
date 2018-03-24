import React from "react";
import { ImageNotation, ImageWorkStoreProps, STORE_IMAGEWORK } from "../../../stores/ImageWorkStore";
import { PartJob, PartJobTuple } from "../../../models/instance/image/job/PartJob";
import { inject, observer } from "mobx-react";
import { ImageWorkPageProps } from "./ImageWorkPage";
import { action, computed, observable, toJS } from "mobx";
import { Row, Col, Card} from 'antd';
import { WholeJob } from "../../../models/instance/image/job/WholeJob";
import { TagDescriptionTuple } from "../../../models/instance/TagTuple";
import { MissionTipCard } from "../../../components/ImageWork/MissionTipCard";
import { ProgressController } from "../../../components/ProgressController";
import { TagDescriptionTuplePanel } from "../../../components/ImageWork/TagDescriptionPanel";
import { RectanglePanel } from "../../../components/ImageWork/DrawingPad/RectanglePanel";
import { ImageMissionType } from "../../../models/mission/image/ImageMission";
import { PartAddingModeController } from "../../../components/ImageWork/Part/PartAddingModeController";
import { replaceElement } from "../../../../utils/Array";
import { DistrictJob, DistrictTagDescriptionTuple } from "../../../models/instance/image/job/DistrictJob";
import { DistrictPanel } from "../../../components/ImageWork/DrawingPad/DistrictPanel";
import { DistrictAddingModeController } from "../../../components/ImageWork/DistrictAddingModeController";
import { DistrictDrawingSession } from "../../../components/ImageWork/DrawingPad/DistrictPanel/DistrictCanvas/DistrictDrawingSession";
import { District } from "../../../components/ImageWork/DrawingPad/DistrictPanel/Districts";

@observer
export class ImageDistrictWorkPage extends React.Component<ImageWorkPageProps<DistrictJob>, any> {
  @observable notation: ImageNotation<DistrictJob> = this.props.notation;
  @observable selectedIndex: number =1;
  @observable addingMode: boolean = false;

  @computed get selectedTuple() {
    if (this.selectedIndex>=0 && this.selectedIndex < this.notation.job.tuples.length) {
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
    this.selectedIndex = this.notation.job.tuples.length-1;
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

  render() {
    const { imageUrl, job } = this.props.notation;

    const { missionDetail, controllerProps, readonlyMode } = this.props;
    const selectedTuple = this.selectedTuple;

    let session;
    if (this.addingMode) {
      session = new DistrictDrawingSession();
    }

    return <div>

      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <DistrictPanel imageUrl={imageUrl}
                            tuples={this.notation.job.tuples}
                            addingMode={this.addingMode}
                            session={session}
                            onTupleSelected={this.onTupleSelected}
                            selectedTuple={selectedTuple}
            />

          </Card>
        </Col>
        <Col span={8}>
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
            ?  <TagDescriptionTuplePanel tuple={selectedTuple.tagDescriptionTuple}
                                         readonlyMode={readonlyMode}
                                         onChange={this.onTupleChanged}/>
            : null}

          <ProgressController {...this.props.controllerProps}

            readonlyMode={readonlyMode}
                              saveProgress={this.submit}
          />
        </Col>
      </Row>
    </div>
  }
}
