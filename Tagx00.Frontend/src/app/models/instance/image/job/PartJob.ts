import { Point } from "../Shapes";
import { TagDescriptionTuple } from "../../TagTuple";
import { ImageJob } from "./ImageJob";
import { ImageMissionType } from "../../../mission/image/ImageMission";

export interface PartJobTuple {
  leftTopPoint: Point;
  rightBottomPoint: Point;
  tagDescriptionTuple: TagDescriptionTuple;
}

export interface PartJob extends ImageJob {
  type: ImageMissionType.PART,
  tuples: PartJobTuple[];
}
