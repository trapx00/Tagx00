import React, { ReactNode } from 'react';
import { Inject } from "react.di";
import { WorkerService } from "../../../api/WorkerService";
import { ImageMissionDetail, ImageMissionType } from "../../../models/mission/image/ImageMission";
import { ImageNotation } from "./image/ImageWorkPageController";
import { Notation, WorkPageController } from "./WorkPageController";
import { LocaleStore } from "../../../stores/LocaleStore";
import { action, observable } from "mobx";
import { message, Progress } from 'antd';
import { InstanceDetail } from "../../../models/instance/InstanceDetail";
import { MissionDetail } from "../../../models/mission/MissionDetail";
import { observer } from "mobx-react";
import { ImageJob } from "../../../models/instance/image/job/ImageJob";
import { CompleteModal } from "../../../components/Mission/WorkPageSuite/CompleteModal";
import { LayoutShortcutProps } from "./WorkPageLayout";


export interface RootWorkPageProps<M extends MissionDetail, I extends InstanceDetail> {
  missionDetail: M;
  instanceDetail: I;
  jumpBack(): void;
  readonlyMode: boolean;
}

export interface WorkPageProps<M extends MissionDetail, J, N extends Notation<J>> {
  notation: N;
  submit(notation: N): void;
  missionDetail: M;
  goNext(notation: N): void;
  controllerProps: {
    goPrevious(): void;
    previousAvailable: boolean;
    saving: boolean;
    toFirstIncomplete() : void;
  },
  readonlyMode: boolean;
}

export interface WorkPageState<J, N extends Notation<J>> {
  notation: N;
  selectedIndex: number;
  addingMode: boolean;
}


interface Props<M extends MissionDetail, I extends InstanceDetail, J, N extends Notation<J>> {
  controller: WorkPageController<M, I, J, N>;
  readonlyMode: boolean;
  jumpBack(): void;
  chooseWorkPage(context: WorkPageProps<M,J, N>): ReactNode;
}

const ID_PREFIX = "drawingPad.common.";

@observer
export class WorkPage<M extends MissionDetail, I extends InstanceDetail, J, N extends Notation<J>> 
  extends React.Component<Props<M,I,J,N>, {}> {
  @Inject localeStore: LocaleStore;
  @Inject workerService: WorkerService;

  @observable finishModalShown = true;
  @observable saving: boolean = false;

  @action saveWork = async (notation: N) => {
    this.props.controller.saveWork(notation);
    await this.props.controller.saveProgress(this.workerService);
    message.success(this.localeStore.get(ID_PREFIX + "finish.workSaved"));
  };

  goNext = (notation: N) => {
    this.props.controller.saveWork(notation);
    this.props.controller.nextWork();
  };

  goPrevious = () => {
    this.props.controller.previousWork();
  };

  @action componentDidUpdate() {
    if (this.props.controller.finished) {
      if (this.props.readonlyMode) {
        message.info(this.localeStore.get(ID_PREFIX + "finish.readonlyComplete"));
        this.props.controller.workIndex--;
        return;
      } else {
        this.finishModalShown = true;
      }
    }
  }

  submit = async () => {

    const result = await this.props.controller.submit(this.workerService);
    if (result) {
      console.log("success");
      this.props.jumpBack();
    } else {
      console.log("failure");
    }
  };

  @action cancelFinishModal = () => {
    this.props.controller.workIndex--;
    this.finishModalShown = false;
  };

  saveProgress = async () => {
    await this.props.controller.saveProgress(this.workerService);
    this.props.jumpBack();
  };


  toFirstIncomplete = () => {
    this.props.controller.toFirstNotComplete();
  };

  chooseWorkPage() {

    if (this.props.controller.finished) {
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
    const params: WorkPageProps<M,J,N> = {
      notation: this.props.controller.currentWork,
      submit: this.saveWork,
      missionDetail: this.props.controller.missionDetail,
      goNext: this.goNext,
      controllerProps: {
        goPrevious: this.goPrevious,
        previousAvailable: this.props.controller.workIndex != 0,
        saving: this.saving,
        toFirstIncomplete: this.toFirstIncomplete
      },
      readonlyMode: this.props.readonlyMode
    };


    return this.props.chooseWorkPage(params);
  }

  render() {

    return <div style={{overflow: "hidden"}}>
      {this.chooseWorkPage()}
      <div>
        <Progress percent={this.props.controller.workIndex / this.props.controller.totalCount * 100}
                  status="active"
                  format={percent => `${this.props.controller.workIndex}/${this.props.controller.totalCount}`}
        />
      </div>
    </div>;
  }
}
