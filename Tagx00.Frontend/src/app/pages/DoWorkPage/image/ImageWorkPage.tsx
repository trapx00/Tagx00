import React, { ReactNode } from "react";
import { ImageMissionDetail, ImageMissionType } from "../../../models/mission/ImageMission";
import { ImageInstanceDetail } from "../../../models/instance/image/ImageInstanceDetail";
import { ImageNotation, ImageWorkStore } from "../../../stores/ImageWorkStore";
import { observer, Provider } from "mobx-react";
import { ImagePartWorkPage } from "./ImagePartWorkPage";
import { PartJob } from "../../../models/instance/image/job/PartJob";
import { ImageDistrictWorkPage } from "./ImageDistrictWorkPage";
import { ImageWholeWorkPage } from "./ImageWholeWorkPage";
import { Progress, message } from 'antd';
import { CompleteModal } from "../../../components/ImageWork/CompleteModal";
import { WholeJob } from "../../../models/instance/image/job/WholeJob";
import { ImageJob } from "../../../models/instance/image/job/ImageJob";
import { ProgressController } from "../../../components/ProgressController";

interface Props {
  instanceDetail: ImageInstanceDetail;
  missionDetail: ImageMissionDetail;
}

export interface ImageWorkPageProps<T extends ImageJob> {
  notation: ImageNotation<T>;
  submit: (notation: ImageNotation) => void;
  missionDetail: ImageMissionDetail;
  controllerProps: {
    goNext: () => void;
    goPrevious: () => void;
    previousAvailable: boolean;
  }

}

@observer
export class ImageWorkPage extends React.Component<Props, {}> {

  store: ImageWorkStore;

  constructor(props){
    super(props);
    const { instanceDetail, missionDetail } = this.props;
    this.store = new ImageWorkStore(missionDetail.imageUrls, missionDetail.imageMissionTypes, instanceDetail);
  }

  saveWork = (notation: ImageNotation) => {
    this.store.saveWork(notation);
    message.success("work saved successfully");
  };

  goNext = () => {
    this.store.nextWork1();
  };

  goPrevious = () => {
    this.store.previousWork1();
  };


  chooseWorkPage() {
    const currentWork: ImageNotation = this.store.currentWork;

    if (typeof currentWork === 'undefined') {
      this.store.doSecondStep();
      return <div/>; // unmount previous page to restore state.
    }

    if (!currentWork) {
      return <CompleteModal shown={true}/>;
    }

    const params = {
      notation: currentWork as any,
      submit: this.saveWork,
      missionDetail: this.props.missionDetail,
      controllerProps: {
        goNext: this.goNext,
        goPrevious: this.goPrevious,
        previousAvailable: this.store.workIndex != 0
      }
    };

    switch (currentWork.job.type) {
      case ImageMissionType.PART:
        return <ImagePartWorkPage {...params}/>;
      case ImageMissionType.DISTRICT:
        return <ImageDistrictWorkPage {...params}/>;
      case ImageMissionType.WHOLE:
        return <ImageWholeWorkPage  {...params}/>;
    }
  }

  render() {
    const { instanceDetail, missionDetail } = this.props;

    return <div>
      <h1>{missionDetail.publicItem.title}</h1>
      {this.chooseWorkPage()}
      <div>
        <Progress percent={this.store.progress / this.store.totalCount * 100}
                  status="active"
                  format={percent => `${this.store.progress}/${this.store.totalCount}`}
        />
      </div>
      <div>
        <button onClick={this.goNext}>
          Go next
        </button>
      </div>
    </div>;
  }
}
