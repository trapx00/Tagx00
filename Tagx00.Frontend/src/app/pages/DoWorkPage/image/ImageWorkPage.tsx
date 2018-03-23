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
import { action, observable, toJS } from "mobx";
import { workerService } from "../../../api/WorkerService";

interface Props {
  instanceDetail: ImageInstanceDetail;
  missionDetail: ImageMissionDetail;
  token: string;
  jumpBack: () => void;
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

  @observable finishModalShown = true;



  constructor(props) {
    super(props);
    const {instanceDetail, missionDetail} = this.props;
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

  @action componentDidUpdate() {
    const currentWork: ImageNotation = this.store.currentWork;

    if (this.store.finished) {
      this.finishModalShown = true;
    }

    if (typeof currentWork === 'undefined') {
      this.store.doSecondStep();
    }

  }

  submit = async () => {

    const result = await workerService.submit(this.props.missionDetail.publicItem.missionId,
      this.store.currentInstanceDetail, this.props.token);
    if (result) {
      console.log("success");
      this.props.jumpBack();
    } else {
      console.log("failure");
    }
  };

  @action cancelFinishModal = () => {
    this.store.workIndex --;
    this.finishModalShown = !this.finishModalShown;
  };

  saveProgress = async () => {
    console.log(this.store.currentInstanceDetail);
    console.log(toJS(this.store.currentInstanceDetail));
    const result = await workerService.saveProgress(this.props.missionDetail.publicItem.missionId,
      this.store.currentInstanceDetail, this.props.token);
    if (result) {
      console.log("success");
      this.props.jumpBack();
    } else {
      console.log("failure");
    }
  };


  chooseWorkPage() {
    const currentWork: ImageNotation = this.store.currentWork;

    if (this.store.finished) {

      return <CompleteModal shown={this.finishModalShown}
                            submit={this.submit}
                            saveProgress={this.saveProgress}
                            goBack={this.cancelFinishModal}

      />;
    }

    if (typeof currentWork === 'undefined') {
      return <div/>; // unmount previous page to restore state.
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
    const {instanceDetail, missionDetail} = this.props;

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
