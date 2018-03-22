import { Point } from "../Shapes";
import { TagDescriptionTuple } from "../../TagTuple";
import { ImageJob } from "./ImageJob";

export interface PartJobTuple {
  leftTopPoint: Point;
  rightBottomPoint: Point;
  tagDescriptionTuple: TagDescriptionTuple;
}

export interface PartJob extends ImageJob {
  tuples: PartJobTuple[];
}
