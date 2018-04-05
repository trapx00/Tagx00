import React from "react";
import { ImageMissionType } from "../../../models/mission/image/ImageMission";
import { ImageNotation } from "../../../stores/ImageWorkStore";
import { WholeJob } from "../../../models/instance/image/job/WholeJob";
import { Card, Col, Row } from 'antd';
import { TagDescriptionTuple } from "../../../models/instance/TagTuple";
import { observer } from "mobx-react";
import { ImageWorkPageProps } from "./ImageWorkPage";
import { MissionTipCard } from "../../../components/ImageWork/MissionTipCard";
import { TagDescriptionTuplePanel } from "../../../components/ImageWork/TagDescriptionPanel";
import { ProgressController } from "../../../components/ProgressController";
import { action, observable, toJS } from "mobx";
import * as localStyle from './style.css';
import { ImageWorkPageLayout } from "./Layout";

@observer
export class ImageWholeWorkPage extends React.Component<ImageWorkPageProps<WholeJob>, any> {

  @observable notation: ImageNotation<WholeJob> = this.props.notation;
  @observable width: number = 1;
  @observable height: number = 1;

  @action fillNotation() {
    if (!(this.notation.job && this.notation.job.tuple)) {
      this.notation.job = {
        type: ImageMissionType.WHOLE,
        tuple: {
          tagTuples: [],
          descriptions: []
        }
      };
    }
    console.log(toJS(this.notation));
  }

  goNext = () => {
    this.props.goNext(this.notation);
  };

  constructor(props) {
    super(props);
    this.fillNotation();
  }

  @action onTupleChange = (tuple: TagDescriptionTuple) => {
    this.notation.job.tuple = tuple;
  };

  submit = () => {
    console.log(toJS(this.notation));
    this.props.submit(this.notation);
  };

  render() {

    const { imageUrl, job } = this.notation;
    const { missionDetail, controllerProps } = this.props;
    return <ImageWorkPageLayout imageWidth={this.width} imageHeight={this.height} setScale={() => {}}>
      <>
        <img src={imageUrl} />
      </>
      <>
        <div className={localStyle.controller}>
          <MissionTipCard jobType={job.type}
            tags={missionDetail.publicItem.allowedTags}
            allowCustomTag={missionDetail.publicItem.allowCustomTag}
            title={missionDetail.publicItem.title}
          />
          <TagDescriptionTuplePanel tuple={job.tuple} onChange={this.onTupleChange} readonlyMode={this.props.readonlyMode}/>
          <ProgressController {...this.props.controllerProps}
            goNext={this.goNext}
            readonlyMode={this.props.readonlyMode}
            saveProgress={this.submit}
          />
        </div>
      </>
    </ImageWorkPageLayout>
  }
}
