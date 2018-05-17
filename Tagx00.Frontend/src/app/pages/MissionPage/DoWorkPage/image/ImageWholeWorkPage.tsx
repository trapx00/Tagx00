import React from "react";
import { ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { ImageNotation } from "./ImageWorkStore";
import { WholeJob } from "../../../../models/instance/image/job/WholeJob";
import { TagDescriptionTuple } from "../../../../models/instance/TagTuple";
import { MissionTipCard } from "../../../../components/ImageWork/MissionTipCard";
import { TagDescriptionTuplePanel } from "../../../../components/ImageWork/TagDescriptionPanel";
import { ProgressController } from "../../../../components/ImageWork/ProgressController";
import { toJS } from "mobx";
import { WorkPageLayout } from "../WorkPageLayout";
import { ImageWorkPageProps, ImageWorkPageStates } from "./shared";
import { ImageWorkPageLayout } from "./ImageWorkPageLayout";

function initializeNotation(notation: ImageNotation<WholeJob>) {
  if (!(notation.job && notation.job.tuple)) {
    notation.job = {
      type: ImageMissionType.WHOLE,
      tuple: {
        tagTuples: [],
        descriptions: []
      }
    };
  }
  return notation;
}

export class ImageWholeWorkPage extends React.Component<ImageWorkPageProps<WholeJob>, ImageWorkPageStates<WholeJob>> {

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

  setScale = (scale) => {
    this.scale = scale;
  };

  onImageLoad = (e) => {
    this.setState({
      width: e.target.width,
      height: e.target.height
    });
  };

  render() {

    const { imageUrl, job } = this.state.notation;
    const { missionDetail, controllerProps } = this.props;
    return <ImageWorkPageLayout imageUrl={imageUrl} imageWidth={this.state.width} imageHeight={this.state.height} setScale={this.setScale}>
      <>
        <img onLoad={this.onImageLoad} src={imageUrl}/>
      </>
      <>
          <MissionTipCard jobType={job.type}
            tags={missionDetail.publicItem.allowedTags}
            allowCustomTag={missionDetail.publicItem.allowCustomTag}
            title={missionDetail.publicItem.title}
          />
          <TagDescriptionTuplePanel tuple={job.tuple}
                                    onChange={this.onTupleChange}
                                    readonlyMode={this.props.readonlyMode}
                                    allowedTags={missionDetail.publicItem.allowCustomTag ? null : missionDetail.publicItem.allowedTags}
          />
          <ProgressController {...this.props.controllerProps}
            goNext={this.goNext}
            readonlyMode={this.props.readonlyMode}
            saveProgress={this.submit}
          />
      </>
    </ImageWorkPageLayout>
  }
}
