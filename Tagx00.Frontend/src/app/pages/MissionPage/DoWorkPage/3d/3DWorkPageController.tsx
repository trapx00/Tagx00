import { ThreeDimensionJob } from "../../../../models/instance/3d/job/3dJob";
import { ThreeDimensionWholeJob } from "../../../../models/instance/3d/job/3dWholeJob";
import { ThreeDimensionMissionDetail, ThreeDimensionMissionType } from "../../../../models/mission/3d/3dMission";
import { arrayContainsElement } from "../../../../../utils/Array";
import { WorkPageController } from "../WorkPageController";
import { ThreeDimensionInstanceDetail } from "../../../../models/instance/3d/3dInstanceDetail";
import { ThreeDimensionNotation } from "./shared";
import { MissionType } from "../../../../models/mission/Mission";


export type Known3DJob = ThreeDimensionWholeJob;


export class ThreeDimensionWorkPageController extends WorkPageController<ThreeDimensionMissionDetail,
  ThreeDimensionInstanceDetail, ThreeDimensionJob, ThreeDimensionNotation> {

  tokens: string[];

  currentInstanceDetail(): ThreeDimensionInstanceDetail {
    const {instance} = this.initialDetail;
    return {
      missionType: MissionType.THREE_DIMENSION,
      resultList: this.currentNotations.map((x, index) => ({
        workResultId: index+"",
        instanceId: instance.instanceId,
        job: x.job,
        token: x.token,
        isDone: this.judgeJobComplete(x.job as any)
      })),
      instance: instance
    }
  }

  judgeJobComplete(job: Known3DJob) {
    if (!job) return false;
    switch (job.type) {
      case ThreeDimensionMissionType.WHOLE:
        return !!job.tuple && ( arrayContainsElement(job.tuple.tagTuples) || arrayContainsElement(job.tuple.descriptions));
    }
    return false;
  }

  constructor(missionDetail: ThreeDimensionMissionDetail, instanceDetail: ThreeDimensionInstanceDetail) {
    super(missionDetail, instanceDetail);
    this.tokens = missionDetail.tokens;

    for (const token of this.tokens) {
        const result = instanceDetail.resultList
          && instanceDetail.resultList.find(x =>
            x.token == token
            && x.job
            && x.job.type === ThreeDimensionMissionType.WHOLE);
        if (result) { //existing job, push in
          this.currentNotations.push(result);
          // this.workIndex++; // existing job, resume progress
        } else {
          this.currentNotations.push({
            token: token,
            job: {type: ThreeDimensionMissionType.WHOLE}
          });
        }
    }

    this.toFirstNotComplete();
  }

}
