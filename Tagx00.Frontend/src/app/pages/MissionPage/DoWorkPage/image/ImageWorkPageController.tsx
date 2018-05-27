import { action, computed, observable, runInAction, toJS } from "mobx";
import { ImageInstanceDetail } from "../../../../models/instance/image/ImageInstanceDetail";
import { ImageJob, KnownImageJob } from "../../../../models/instance/image/job/ImageJob";
import { ImageMissionDetail, ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { ImageResult } from "../../../../models/instance/image/ImageResult";
import { WorkerService } from "../../../../api/WorkerService";
import { Injectable } from "react.di";
import { MissionType } from "../../../../models/mission/Mission";
import { Notation, WorkPageController } from "../WorkPageController";

export interface ImageNotation<T extends ImageJob = ImageJob> extends Notation<T> {
  imageUrl: string;
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
export class ImageWorkPageController extends WorkPageController<ImageMissionDetail, ImageInstanceDetail,ImageJob, ImageNotation> {
  imageUrls: string[];

  @observable saving: boolean = false;

  currentInstanceDetail(): ImageInstanceDetail {
    const {instance} = this.initialDetail;
    return {
      missionType: MissionType.IMAGE,
      imageResults: this.currentNotations.map((x, index) => ({
        workResultId: index+"",
        instanceId: instance.instanceId,
        imageJob: x.job,
        url: x.imageUrl,
        isDone: judgeJobComplete(x.job as any)
      })),
      instance: instance
    }
  }

  get types() {
    return this.missionDetail.imageMissionTypes;
  }

  constructor(missionDetail: ImageMissionDetail, instanceDetail: ImageInstanceDetail) {
    super(missionDetail, instanceDetail);
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
  }


}
