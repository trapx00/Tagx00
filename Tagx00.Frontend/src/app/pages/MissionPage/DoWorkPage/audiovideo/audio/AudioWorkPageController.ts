import { WorkPageController } from "../../WorkPageController";
import { AudioMissionDetail, AudioMissionType } from "../../../../../models/mission/audio/AudioMission";
import { AudioInstance } from "../../../../../models/instance/audio/AudioInstance";
import { AudioInstanceDetail } from "../../../../../models/instance/audio/AudioInstanceDetail";
import { AudioJob } from "../../../../../models/instance/audio/job/AudioJob";
import { AudioNotation } from "./shared";
import { ImageResult } from "../../../../../models/instance/image/ImageResult";
import { MissionType } from "../../../../../models/mission/Mission";
import { KnownImageJob } from "../../../../../models/instance/image/job/ImageJob";
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { AudioPartJob } from "../../../../../models/instance/audio/job/AudioPartJob";
import { AudioWholeJob } from "../../../../../models/instance/audio/job/AudioWholeJob";
import { arrayContainsElement } from "../../../../../../utils/Array";

export type KnownAudioJob = AudioPartJob | AudioWholeJob;


export class AudioWorkPageController extends WorkPageController<AudioMissionDetail, AudioInstanceDetail, AudioJob, AudioNotation> {

  audioUrls: string[];

  currentInstanceDetail(): AudioInstanceDetail {
    const {instance} = this.initialDetail;
    return {
      missionType: MissionType.AUDIO,
      resultList: this.currentNotations.map((x, index) => ({
        workResultId: index+"",
        instanceId: instance.instanceId,
        job: x.job,
        audioUrl: x.audioUrl,
        isDone: this.judgeJobComplete(x.job as any)
      })),
      instance: instance
    }
  }

  judgeJobComplete(job: KnownAudioJob) {
    if (!job) return false;
    switch (job.type) {
      case AudioMissionType.PART:
        return arrayContainsElement(job.tupleList);
      case AudioMissionType.WHOLE:
        return !!job.tuple && ( arrayContainsElement(job.tuple.tagTuples) || arrayContainsElement(job.tuple.descriptions));
    }
    return false;
  }

  constructor(missionDetail: AudioMissionDetail, instanceDetail: AudioInstanceDetail) {
    super(missionDetail, instanceDetail);
    this.audioUrls = missionDetail.audioUrls;

    for (const url of this.audioUrls) {
      for (const type of missionDetail.publicItem.audioMissionTypes) {

        const result = instanceDetail.resultList
          && instanceDetail.resultList.find(x => x.audioUrl === url && x.job && x.job.type === type);
        if (result) { //existing job, push in
          this.currentNotations.push(result);
          // this.workIndex++; // existing job, resume progress
        } else {
          this.currentNotations.push({
            audioUrl: url,
            job: {type: type}
          });
        }
      }
    }

    this.toFirstNotComplete();
  }

}
