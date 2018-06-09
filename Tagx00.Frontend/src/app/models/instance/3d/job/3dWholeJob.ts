import { ThreeDimensionJob } from "./3dJob";
import { TagDescriptionTuple } from "../../TagTuple";

export interface ThreeDimensionWholeJob extends ThreeDimensionJob {
  tuple: TagDescriptionTuple;
}
