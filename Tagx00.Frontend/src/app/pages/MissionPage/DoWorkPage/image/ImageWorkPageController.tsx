import { observable } from "mobx";
import { ImageInstanceDetail } from "../../../../models/instance/image/ImageInstanceDetail";
import { ImageJob, KnownImageJob } from "../../../../models/instance/image/job/ImageJob";
import { ImageMissionDetail, ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { ImageResult } from "../../../../models/instance/image/ImageResult";
import { Injectable } from "react.di";
import { MissionType } from "../../../../models/mission/Mission";
import { Notation, WorkPageController } from "../WorkPageController";
import { MissionAsset } from "../../../../models/mission/MissionAsset";
import { arrayContainsElement } from "../../../../../utils/Array";

export interface ImageNotation<T extends ImageJob = ImageJob> extends Notation<T> {
  imageAsset: MissionAsset;
}



export class ImageWorkPageController extends WorkPageController<ImageMissionDetail, ImageInstanceDetail,ImageJob, ImageNotation> {
  imageAssets: MissionAsset[];

  @observable saving: boolean = false;

  currentInstanceDetail(): ImageInstanceDetail {
    const {instance} = this.initialDetail;
    return {
      missionType: MissionType.IMAGE,
      imageResults: this.currentNotations.map((x, index) => ({
        workResultId: index+"",
        instanceId: instance.instanceId,
        imageJob: x.job,
        url: x.imageAsset.url,
        isDone: this.judgeJobComplete(x.job as any)
      })),
      instance: instance
    }
  }

  judgeJobComplete(job: KnownImageJob) {
    if (!job) return false;
    switch (job.type) {
      case ImageMissionType.DISTRICT:
        return arrayContainsElement(job.tuples);
      case ImageMissionType.PART:
        return arrayContainsElement(job.tuples);
      case ImageMissionType.WHOLE:
        return !!job.tuple && ( arrayContainsElement(job.tuple.tagTuples) || arrayContainsElement(job.tuple.descriptions));
    }
    return false;
  }

  get types() {
    return this.missionDetail.publicItem.imageMissionTypes;
  }

  constructor(missionDetail: ImageMissionDetail, instanceDetail: ImageInstanceDetail) {
    super(missionDetail, instanceDetail);
    this.imageAssets = missionDetail.missionAssets;

    for (const asset of this.imageAssets) {
      for (const type of missionDetail.publicItem.imageMissionTypes) {

        const result: ImageResult = instanceDetail.imageResults && instanceDetail.imageResults.find(x => x.url === asset.url && x.imageJob && x.imageJob.type === type);
        if (result) { //existing job, push in
          this.currentNotations.push({
            imageAsset: asset,
            job: result.imageJob,
          });
          // this.workIndex++; // existing job, resume progress
        } else {
          this.currentNotations.push({
            imageAsset: asset,
            job: {type: type}
          });
        }
      }
    }

    this.toFirstNotComplete();
  }


}
