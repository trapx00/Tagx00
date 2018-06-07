import { ThreeDimensionJob } from "../../../../models/instance/3d/job/3dJob";
import { ThreeDimensionWholeJob } from "../../../../models/instance/3d/job/3dWholeJob";
import { ThreeDimensionMissionDetail, ThreeDimensionMissionType } from "../../../../models/mission/3d/3dMission";
import { arrayContainsElement } from "../../../../../utils/Array";
import { WorkPageController } from "../WorkPageController";
import { ThreeDimensionInstanceDetail } from "../../../../models/instance/3d/3dInstanceDetail";
import { ThreeDimensionNotation } from "./shared";
import { MissionType } from "../../../../models/mission/Mission";
import { modelUrlEquals, ThreeDimensionModelUrl } from "../../../../models/mission/3d/3dModelUrl";


export type Known3DJob = ThreeDimensionWholeJob;

function judgeJobComplete(job: Known3DJob) {
  if (!job) return false;
  switch (job.type) {
    case ThreeDimensionMissionType.WHOLE:
      return !!job.tuple && ( arrayContainsElement(job.tuple.tagTuples) || arrayContainsElement(job.tuple.descriptions));
  }
  return false;
}
export class ThreeDimensionWorkPageController extends WorkPageController<ThreeDimensionMissionDetail,
  ThreeDimensionInstanceDetail, ThreeDimensionJob, ThreeDimensionNotation> {

  models: ThreeDimensionModelUrl[];

  currentInstanceDetail(): ThreeDimensionInstanceDetail {
    const {instance} = this.initialDetail;
    return {
      missionType: MissionType.THREE_DIMENSION,
      resultList: this.currentNotations.map((x, index) => ({
        workResultId: index+"",
        instanceId: instance.instanceId,
        job: x.job,
        url: x.url,
        isDone: judgeJobComplete(x.job as any)
      })),
      instance: instance
    }
  }

  constructor(missionDetail: ThreeDimensionMissionDetail, instanceDetail: ThreeDimensionInstanceDetail) {
    super(missionDetail, instanceDetail);
    this.models = missionDetail.models;

    for (const url of this.models) {
        const result = instanceDetail.resultList
          && instanceDetail.resultList.find(x =>
            modelUrlEquals(x.url,url)
            && x.job
            && x.job.type === ThreeDimensionMissionType.WHOLE);
        if (result) { //existing job, push in
          this.currentNotations.push(result);
          // this.workIndex++; // existing job, resume progress
        } else {
          this.currentNotations.push({
            url: url,
            job: {type: ThreeDimensionMissionType.WHOLE}
          });
        }
    }
  }

}
