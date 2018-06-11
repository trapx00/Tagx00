import { VideoJob } from "./VideoJob";
import { TagDescriptionTuple } from "../../TagTuple";
import { VideoMissionType } from "../../../mission/video/VideoMission";

export interface VideoPartTuple {
  startOffset: number;
  endOffset: number;
  tuple: TagDescriptionTuple;
}

export interface VideoPartJob extends VideoJob {
  type: VideoMissionType.PART;
  tupleList: VideoPartTuple[];
}
