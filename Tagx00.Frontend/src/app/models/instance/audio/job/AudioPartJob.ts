import { AudioJob } from "./AudioJob";
import { TagDescriptionTuple } from "../../TagTuple";
import { AudioMissionType } from "../../../mission/audio/AudioMission";

export interface AudioPartTuple {
  startOffset: number;
  endOffset: number;
  tuple: TagDescriptionTuple;
}



export interface AudioPartJob extends AudioJob {
  tupleList: AudioPartTuple[];
  type: AudioMissionType.PART;
}
