import { WorkPageController } from "../../WorkPageController";
import { VideoMissionDetail, VideoMissionType } from "../../../../../models/mission/video/VideoMission";
import { VideoInstance } from "../../../../../models/instance/video/VideoInstance";
import { VideoInstanceDetail } from "../../../../../models/instance/video/VideoInstanceDetail";
import { VideoJob } from "../../../../../models/instance/video/job/VideoJob";
import { VideoNotation } from "./shared";
import { ImageResult } from "../../../../../models/instance/image/ImageResult";
import { MissionType } from "../../../../../models/mission/Mission";
import { KnownImageJob } from "../../../../../models/instance/image/job/ImageJob";
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { VideoPartJob } from "../../../../../models/instance/video/job/VideoPartJob";
import { VideoWholeJob } from "../../../../../models/instance/video/job/VideoWholeJob";
import { arrayContainsElement } from "../../../../../../utils/Array";

export type KnownVideoJob = VideoPartJob | VideoWholeJob;


export class VideoWorkPageController extends WorkPageController<VideoMissionDetail, VideoInstanceDetail, VideoJob, VideoNotation> {

  videoUrls: string[];

  currentInstanceDetail(): VideoInstanceDetail {
    const {instance} = this.initialDetail;
    return {
      missionType: MissionType.VIDEO,
      resultList: this.currentNotations.map((x, index) => ({
        workResultId: index+"",
        instanceId: instance.instanceId,
        job: x.job,
        videoUrl: x.videoUrl,
        isDone: this.judgeJobComplete(x.job as any)
      })),
      instance: instance
    }
  }

  judgeJobComplete(job: KnownVideoJob) {
    if (!job) return false;
    switch (job.type) {
      case VideoMissionType.PART:
        return arrayContainsElement(job.tupleList);
      case VideoMissionType.WHOLE:
        return !!job.tuple && ( arrayContainsElement(job.tuple.tagTuples) || arrayContainsElement(job.tuple.descriptions));
    }
    return false;
  }

  constructor(missionDetail: VideoMissionDetail, instanceDetail: VideoInstanceDetail) {
    super(missionDetail, instanceDetail);
    this.videoUrls = missionDetail.videoUrls;

    for (const url of this.videoUrls) {
      for (const type of missionDetail.videoMissionTypes) {

        const result = instanceDetail.resultList
          && instanceDetail.resultList.find(x => x.videoUrl === url && x.job && x.job.type === type);
        if (result) { //existing job, push in
          this.currentNotations.push(result);
          // this.workIndex++; // existing job, resume progress
        } else {
          this.currentNotations.push({
            videoUrl: url,
            job: {type: type}
          });
        }
      }
    }

    // this.toFirstNotComplete();
  }

}
