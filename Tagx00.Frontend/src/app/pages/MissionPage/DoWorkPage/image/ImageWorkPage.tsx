import React from "react";
import { ImageMissionDetail, ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { ImageInstanceDetail } from "../../../../models/instance/image/ImageInstanceDetail";
import { ImageWorkPageController } from "./ImageWorkPageController";
import { observer } from "mobx-react";
import { ImagePartWorkPage } from "./ImagePartWorkPage";
import { ImageDistrictWorkPage } from "./ImageDistrictWorkPage";
import { ImageWholeWorkPage } from "./ImageWholeWorkPage";
import { RootWorkPageProps, WorkPage, WorkPageProps } from "../WorkPage";
import { ImageJob } from "../../../../models/instance/image/job/ImageJob";
import { ImageNotation } from "./shared";

interface Props extends RootWorkPageProps<ImageMissionDetail, ImageInstanceDetail>{

}

const ID_PREFIX = "drawingPad.common.";
@observer
export class ImageWorkPage extends React.Component<Props> {

  controller: ImageWorkPageController = new ImageWorkPageController(this.props.missionDetail, this.props.instanceDetail);

  chooseWorkPage = (context: WorkPageProps<ImageMissionDetail, ImageJob, ImageNotation>) => {

    const currentWork = context.notation;
    switch (currentWork.job.type) {
      case ImageMissionType.PART:
        return <ImagePartWorkPage {...context as any}/>;
      case ImageMissionType.DISTRICT:
        return <ImageDistrictWorkPage {...context as any}/>;
      case ImageMissionType.WHOLE:
        return <ImageWholeWorkPage  {...context as any}/>;
    }
  };

  render() {

    return <WorkPage controller={this.controller}
                     chooseWorkPage={this.chooseWorkPage}
                     jumpBack={this.props.jumpBack}
                     readonlyMode={this.props.readonlyMode}
    />;
  }
}
