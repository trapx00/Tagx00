import { Point } from "../Shapes";
import { TagDescriptionTuple } from "../../TagDescriptionTuple";
import { ImageJob } from "./ImageJob";

export interface PartJob extends ImageJob {
  leftTopPoint: Point;
  rightBottomPoint: Point;
  tagDescriptionTuple: TagDescriptionTuple;
}
