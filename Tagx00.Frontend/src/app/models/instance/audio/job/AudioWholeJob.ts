import { AudioJob } from "./AudioJob";
import { TagDescriptionTuple } from "../../TagTuple";
import { AudioMissionType } from "../../../mission/audio/AudioMission";

export interface AudioWholeJob extends AudioJob {
  tuple: TagDescriptionTuple;
  type: AudioMissionType.WHOLE;
}
