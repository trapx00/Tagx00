import { MissionDetail } from "../../../models/mission/MissionDetail";
import { InstanceDetail } from "../../../models/instance/InstanceDetail";
import { action, computed, observable, runInAction, toJS } from "mobx";
import { WorkerService } from "../../../api/WorkerService";


export interface Notation<J> {
  job: J;
}

export abstract class WorkPageController<M extends MissionDetail, I extends InstanceDetail, J, N extends Notation<J>> {
  currentNotations: N[] = [];

  missionDetail: M;
  initialDetail: I;

  abstract currentInstanceDetail(): I;

  @observable workIndex = 0;

  protected constructor(missionDetail: M, instanceDetail: I) {
    this.missionDetail = missionDetail;
    this.initialDetail = instanceDetail;
  }
  @computed get jobCount() {
    return this.currentNotations.length;
  }

  @action saveWork(notation: N) {
    this.currentNotations[this.workIndex] = notation;
  }

  @computed get currentWork(): N {
    if (this.workIndex == this.currentNotations.length) {
      return null;
    } else {
      return this.currentNotations[this.workIndex];
    }

  }

  @computed get canGoNext() {
    return this.workIndex < this.jobCount-1;
  }

  @computed get canGoPrevious() {
    return this.workIndex >0;
  }

  abstract judgeJobComplete(job: J): boolean;

  @action toFirstNotComplete() {

    const index = this.currentNotations.findIndex(x => !this.judgeJobComplete(x.job));

    if (index === -1) {
      this.workIndex = this.currentNotations.length-1;
    } else {
      this.workIndex = index;
    }
  }

  @action nextWork() {
    if (this.canGoNext) {
      this.workIndex++;
    }

  }

  @action previousWork() {
    if (this.canGoPrevious) {
      this.workIndex--;
    }
  }

  get totalCount() {
    return this.currentNotations.length;
  }

  async saveProgress(workerService: WorkerService) {
    await workerService.saveProgress(this.missionDetail.publicItem.missionId, this.currentInstanceDetail());
  };

  submit = async (workerService: WorkerService) => {
    const submitVo = this.currentInstanceDetail();
    submitVo.instance.submitDate = new Date();
    const result = await workerService.submit(
      this.missionDetail.publicItem.missionId,
      submitVo,
    );
    return result;
  };


}
