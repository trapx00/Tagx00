import { VideoJob } from "./VideoJob";
import { TagDescriptionTuple } from "../../TagTuple";
import { VideoMissionType } from "../../../mission/video/VideoMission";

export interface VideoWholeJob extends VideoJob {
  type: VideoMissionType.WHOLE;
  tuple: TagDescriptionTuple;
}
