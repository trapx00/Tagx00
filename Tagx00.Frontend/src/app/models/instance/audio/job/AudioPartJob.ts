import { AudioJob } from "./AudioJob";
import { TagDescriptionTuple } from "../../TagTuple";
import { AudioMissionType } from "../../../mission/audio/AudioMission";

export interface AudioPartTuple {
  startOffset: number;
  endOffset: number;
  tuple: TagDescriptionTuple;
}



export interface AudioPartJob extends AudioJob {
  tuple: AudioPartTuple;
  type: AudioMissionType.PART;
}
