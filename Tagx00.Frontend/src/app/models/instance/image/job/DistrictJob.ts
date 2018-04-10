import { ImageJob } from "./ImageJob";
import { Point } from "../Shapes";
import { TagDescriptionTuple } from "../../TagTuple";
import { ImageMissionType } from "../../../mission/image/ImageMission";

export interface Boundary {
  points: Point[];
}

export interface DistrictTagDescriptionTuple {
  boundaries: Boundary[];
  tagDescriptionTuple: TagDescriptionTuple;
}


export interface DistrictJob extends ImageJob {
  type: ImageMissionType.DISTRICT;
  tuples: DistrictTagDescriptionTuple[];
}
