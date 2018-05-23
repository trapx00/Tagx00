import { action, computed, observable, runInAction, toJS } from "mobx";
import { ImageInstanceDetail } from "../../../../models/instance/image/ImageInstanceDetail";
import { ImageJob, KnownImageJob } from "../../../../models/instance/image/job/ImageJob";
import { ImageMissionDetail, ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { ImageResult } from "../../../../models/instance/image/ImageResult";
import { WorkerService } from "../../../../api/WorkerService";
import { Injectable } from "react.di";
import { MissionType } from "../../../../models/mission/Mission";

export interface ImageNotation<T extends ImageJob = ImageJob> {
  imageUrl: string;
  job: T;
}

function any<T>(array: T[]) {
  return !!array && array.length > 0;
}

function judgeJobComplete(job: KnownImageJob) {
  if (!job) return false;
  switch (job.type) {
    case ImageMissionType.DISTRICT:
      return any(job.tuples);
    case ImageMissionType.PART:
      return any(job.tuples);
    case ImageMissionType.WHOLE:
      return !!job.tuple && ( any(job.tuple.tagTuples) || any(job.tuple.descriptions));
  }
  return false;
}

@Injectable
export class ImageWorkStore {
  imageUrls: string[];

  @observable saving: boolean = false;


  initialized: boolean = false;
  currentNotations: ImageNotation[] = [];

  initialDetail: ImageInstanceDetail;
  missionDetail: ImageMissionDetail;

  get currentInstanceDetail(): ImageInstanceDetail {
    const {instance} = this.initialDetail;
    return {
      missionType: MissionType.IMAGE,
      imageResults: this.currentNotations.map((x, index) => ({
        id: index,
        instanceId: instance.instanceId,
        imageJob: x.job,
        url: x.imageUrl,
        isDone: judgeJobComplete(x.job as any)
      })),
      instance: instance
    }
  }

  @observable workIndex: number = 0;

  get types() {
    return this.missionDetail.imageMissionTypes;
  }

  initialize(missionDetail: ImageMissionDetail, instanceDetail: ImageInstanceDetail) {
    this.missionDetail = missionDetail;
    this.initialDetail = instanceDetail;
    this.imageUrls = missionDetail.imageUrls;


    for (const url of this.imageUrls) {
      for (const type of missionDetail.imageMissionTypes) {
        let result: ImageResult;
        //confirm if results exists
        if (instanceDetail.imageResults) {
          result = instanceDetail.imageResults.find(x => x.url === url && x.imageJob && x.imageJob.type === type);
        } else {
          result = null;
        }
        if (result) { //existing job, push in
          this.currentNotations.push({
            imageUrl: url,
            job: result.imageJob,
          });
          // this.workIndex++; // existing job, resume progress
        } else {
          this.currentNotations.push({
            imageUrl: url,
            job: {type: type}
          });
        }
      }
    }
    this.initialized = true;

  }

  constructor(private workerService: WorkerService) { }

  @computed get finished() {
    return this.workIndex === this.currentNotations.length;
  }

  get totalCount() {
    return this.currentNotations.length;
  }

  @computed get progress() {
    return this.workIndex;
  }

  @computed get currentWork(): ImageNotation {
    if (this.workIndex == this.currentNotations.length) {
      return null;
    } else {
      return this.currentNotations[this.workIndex];
    }

  }

  @action saveWork(notation: ImageNotation) {
    this.currentNotations[this.workIndex] = notation;
  }

  @action nextWork() { // second step of going next work
    this.workIndex++;
  }


  @action previousWork() {
    if (this.workIndex > 0) {
      this.workIndex--;
    }
  }

  @action async saveProgress() {
    this.saving = true;
    console.log(toJS(this.currentInstanceDetail));
    await this.workerService.saveProgress(this.missionDetail.publicItem.missionId, this.currentInstanceDetail);
    runInAction(() => {
      this.saving = false;
    });
  };

  submit = async () => {
    const submitVo = this.currentInstanceDetail;
    submitVo.instance.submitDate = new Date();
    const result = await this.workerService.submit(
      this.missionDetail.publicItem.missionId,
      submitVo,
    );
    return result;
  };
}
