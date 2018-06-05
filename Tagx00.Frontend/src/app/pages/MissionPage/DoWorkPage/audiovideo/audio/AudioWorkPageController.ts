import { WorkPageController } from "../../WorkPageController";
import { AudioMissionDetail } from "../../../../../models/mission/audio/AudioMission";
import { AudioInstance } from "../../../../../models/instance/audio/AudioInstance";
import { AudioInstanceDetail } from "../../../../../models/instance/audio/AudioInstanceDetail";
import { AudioJob } from "../../../../../models/instance/audio/job/AudioJob";
import { AudioNotation } from "./shared";

export class AudioWorkPageController extends WorkPageController<AudioMissionDetail, AudioInstanceDetail, AudioJob, AudioNotation> {
  currentInstanceDetail(): AudioInstanceDetail {
    return undefined;
  }

}
