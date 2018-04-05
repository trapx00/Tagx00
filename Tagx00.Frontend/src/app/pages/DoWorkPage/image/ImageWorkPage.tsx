import React, { ReactNode } from "react";
import { ImageMissionDetail, ImageMissionType } from "../../../models/mission/image/ImageMission";
import { ImageInstanceDetail } from "../../../models/instance/image/ImageInstanceDetail";
import { ImageNotation, ImageWorkStore } from "../../../stores/ImageWorkStore";
import { observer } from "mobx-react";
import { ImagePartWorkPage } from "./ImagePartWorkPage";
import { ImageDistrictWorkPage } from "./ImageDistrictWorkPage";
import { ImageWholeWorkPage } from "./ImageWholeWorkPage";
import { message, Progress } from 'antd';
import { CompleteModal } from "../../../components/ImageWork/CompleteModal";
import { ImageJob } from "../../../models/instance/image/job/ImageJob";
import { action, observable, runInAction } from "mobx";
import { WorkerService } from "../../../api/WorkerService";
import { Inject } from "react.di";

interface Props {
  instanceDetail: ImageInstanceDetail;
  missionDetail: ImageMissionDetail;
  token: string;
  jumpBack: () => void;
  readonlyMode: boolean;
  workSavedText: ReactNode;
  readonlyCompleteText: ReactNode;
}

export interface ImageWorkPageProps<T extends ImageJob> {
  notation: ImageNotation<T>;
  submit: (notation: ImageNotation) => void;
  missionDetail: ImageMissionDetail;
  goNext: (notation: ImageNotation) => void;
  controllerProps: {
    goPrevious: () => void;
    previousAvailable: boolean;
    saving: boolean;
  },
  readonlyMode: boolean;
}

@observer
export class ImageWorkPage extends React.Component<Props, {}> {

  store: ImageWorkStore;

  @observable finishModalShown = true;
  @observable saving: boolean= false;

  @Inject workerService: WorkerService;

  constructor(props) {
    super(props);
    const {instanceDetail, missionDetail} = this.props;
    this.store = new ImageWorkStore(missionDetail.imageUrls, missionDetail.imageMissionTypes, instanceDetail);
  }

  @action saveWork = async (notation: ImageNotation) => { // 保存到远端
    this.saving = true;
    this.store.saveWork(notation);
    await this.workerService.saveProgress(this.props.missionDetail.publicItem.missionId, this.store.currentInstanceDetail, this.props.token);
    runInAction(() => {
      this.saving = false;
      message.success(this.props.workSavedText);
    });
  };

  goNext = (notation: ImageNotation) => {
    this.store.saveWork(notation);
    this.store.nextWork1();
  };

  goPrevious = () => {
    this.store.previousWork1();
  };

  @action componentDidUpdate() {
    const currentWork: ImageNotation = this.store.currentWork;

    if (this.store.finished) {
      if (this.props.readonlyMode) {
        message.info(this.props.readonlyCompleteText);
        this.store.workIndex--;
        return;
      } else {
        this.finishModalShown = true;
      }

    }

    if (typeof currentWork === 'undefined') {
      this.store.doSecondStep();
    }

  }

  submit = async () => {

    const result = await this.workerService.submit(this.props.missionDetail.publicItem.missionId,
      this.store.currentInstanceDetail, this.props.token);
    if (result) {
      console.log("success");
      this.props.jumpBack();
    } else {
      console.log("failure");
    }
  };

  @action cancelFinishModal = () => {
    this.store.workIndex--;
    this.finishModalShown = false;
  };

  saveProgress = async () => {
    const result = await this.workerService.saveProgress(this.props.missionDetail.publicItem.missionId,
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
      if (this.props.readonlyMode) {
        return <div/>;
      } else {
        return <CompleteModal shown={this.finishModalShown}
                              submit={this.submit}
                              saveProgress={this.saveProgress}
                              goBack={this.cancelFinishModal}

        />;
      }

    }

    if (typeof currentWork === 'undefined') {
      return <div/>; // unmount previous page to reset missionState.
    }


    const params = {
      notation: currentWork as any,
      submit: this.saveWork,
      missionDetail: this.props.missionDetail,
      goNext: this.goNext,
      controllerProps: {
        goPrevious: this.goPrevious,
        previousAvailable: this.store.workIndex != 0,
        saving: this.saving
      },
      readonlyMode: this.props.readonlyMode
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
      {this.chooseWorkPage()}
      <div>
        <Progress percent={this.store.progress / this.store.totalCount * 100}
                  status="active"
                  format={percent => `${this.store.progress}/${this.store.totalCount}`}
        />
      </div>
    </div>;
  }
}
