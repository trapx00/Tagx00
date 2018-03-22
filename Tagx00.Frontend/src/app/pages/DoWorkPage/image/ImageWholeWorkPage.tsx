import React from "react";
import { ImageMissionDetail } from "../../../models/mission/ImageMission";
import { ImageInstanceDetail } from "../../../models/instance/image/ImageInstanceDetail";
import { ImageNotation, ImageWorkStoreProps, STORE_IMAGEWORK } from "../../../stores/ImageWorkStore";
import { WholeJob } from "../../../models/instance/image/job/WholeJob";
import { Row, Col, Card } from 'antd';
import { TagDescriptionTuple } from "../../../models/instance/TagTuple";
import { inject, observer } from "mobx-react";
import { ImageWorkPageProps } from "./ImageWorkPage";
import { MissionTipCard } from "../../../components/ImageWork/MissionTipCard";
import { TagDescriptionTuplePanel } from "../../../components/ImageWork/TagDescriptionPanel";
import { ProgressController } from "../../../components/ProgressController";
import { observable, toJS } from "mobx";


@observer
export class ImageWholeWorkPage extends React.Component<ImageWorkPageProps<WholeJob>, any> {

  @observable notation: ImageNotation<WholeJob> = this.props.notation;

  onTupleChange = (tuple: TagDescriptionTuple) => {
    this.notation.job.tuple = tuple;
  };

  submit = () => {
    console.log(toJS(this.notation));
    this.props.submit(this.notation);
  };

  render() {

    const { imageUrl, job } = this.props.notation;
    const { missionDetail, controllerProps } = this.props;
    return <div>
      <Row gutter={16}>
        <Col span={16}>
          <Card
            cover={<img src={imageUrl} />}
          >

          </Card>
        </Col>
        <Col span={8}>
          <MissionTipCard jobType={job.type}
            tags={missionDetail.publicItem.allowedTags}
            allowCustomTag={missionDetail.publicItem.allowCustomTag}
          />
          <TagDescriptionTuplePanel tuple={job.tuple} onChange={this.onTupleChange}/>
          <ProgressController {...this.props.controllerProps}
            saveProgress={this.submit}
          />
        </Col>
      </Row>
    </div>
  }
}
