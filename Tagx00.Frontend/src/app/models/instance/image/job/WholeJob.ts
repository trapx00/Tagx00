import { ImageJob } from "./ImageJob";
import { TagDescriptionTuple } from "../../TagTuple";
import { ImageMissionType } from "../../../mission/image/ImageMission";

export interface WholeJob extends ImageJob {
  type: ImageMissionType.WHOLE,
  tuple: TagDescriptionTuple;
}
