import { ImageJob } from "./ImageJob";
import { TagDescriptionTuple } from "../../TagDescriptionTuple";

export interface WholeJob extends ImageJob {
  tuple: TagDescriptionTuple;
}
