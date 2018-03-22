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
import { ImageMissionType } from "../../../models/mission/ImageMission";
import { PartAddingModeController } from "../../../components/ImageWork/Part/PartAddingModeController";
import { replaceElement } from "../../../../utils/Array";

@observer
export class ImagePartWorkPage extends React.Component<ImageWorkPageProps<PartJob>, any> {
  @observable notation: ImageNotation<PartJob> = this.props.notation;
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
        type: ImageMissionType.PART,
        tuples: []
      };
    }
  }

  submit = () => {
    console.log(toJS(this.notation));
    this.props.submit(this.notation);
  };

  @action onTupleCreated = (tuple: PartJobTuple) => {
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

  @action onTupleSelected = (tuple: PartJobTuple) => {
    const index = this.notation.job.tuples.indexOf(tuple);
    this.selectedIndex = index;
  };

  render() {
    const { imageUrl, job } = this.props.notation;

    const { missionDetail, controllerProps } = this.props;
    const selectedTuple = this.selectedTuple;
    console.log(toJS(this.selectedTuple));
    return <div>

      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <RectanglePanel imageUrl={imageUrl}
                            tuples={this.notation.job.tuples}
                            onDrawComplete={this.onTupleCreated}
                            addingMode={this.addingMode}
                            onTupleSelected={this.onTupleSelected}
                            selectedTuple={selectedTuple}
            />

          </Card>
        </Col>
        <Col span={8}>
          <MissionTipCard jobType={job.type}
                          tags={missionDetail.publicItem.allowedTags}
                          allowCustomTag={missionDetail.publicItem.allowCustomTag}
          />
          <PartAddingModeController start={this.startAdding} addingMode={this.addingMode}/>
          {selectedTuple
          ?  <TagDescriptionTuplePanel tuple={selectedTuple.tagDescriptionTuple}
                                       onChange={this.onTupleChanged}/>
          : null}

          <ProgressController {...this.props.controllerProps}
                              saveProgress={this.submit}
          />
        </Col>
      </Row>
    </div>
  }
}
