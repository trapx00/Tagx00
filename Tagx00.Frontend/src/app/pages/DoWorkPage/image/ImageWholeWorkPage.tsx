import React from "react";
import { ImageMissionDetail } from "../../../models/mission/ImageMission";
import { ImageInstanceDetail } from "../../../models/instance/image/ImageInstanceDetail";
import { ImageNotation, ImageWorkStoreProps, STORE_IMAGEWORK } from "../../../stores/ImageWorkStore";
import { WholeJob } from "../../../models/instance/image/job/WholeJob";
import { Row, Col } from 'antd';
import { InfoPanel } from "../../../components/ImageWork/InfoPanel";
import { TagDescriptionTuple } from "../../../models/instance/TagDescriptionTuple";
import { inject, observer } from "mobx-react";
import { ImageWorkPageProps } from "./ImageWorkPage";



export class ImageWholeWorkPage extends React.Component<ImageWorkPageProps<WholeJob>, any> {

  onTupleChange = (tuple: TagDescriptionTuple) => {
    console.log(tuple);
  };

  render() {

    const { imageUrl, job } = this.props.notation;

    return <div>
      <Row gutter={16}>
        <Col span={16} style={{textAlign: "center"}}>
          <img src={imageUrl}/>
        </Col>
        <Col span={8}>
          <InfoPanel mission={this.props.missionDetail}
                     job={job}
                     tuple={job.tuple}
                     onChange={this.onTupleChange}/>
        </Col>
      </Row>
    </div>
  }
}
