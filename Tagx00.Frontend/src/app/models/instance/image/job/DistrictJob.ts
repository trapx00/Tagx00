import { ImageJob } from "./ImageJob";
import { Point } from "../Shapes";
import { TagDescriptionTuple } from "../../TagDescriptionTuple";

export interface Boundary {
  points: Point;
}

export interface DistrictTagDescriptionTuple {
  boundaries: Boundary[];
  tagDescriptionTuple: TagDescriptionTuple;
}


export interface DistrictJob extends ImageJob {
  tuples: DistrictTagDescriptionTuple[];
}
