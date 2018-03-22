import { ImageJob } from "./ImageJob";
import { TagDescriptionTuple } from "../../TagTuple";

export interface WholeJob extends ImageJob {
  tuple: TagDescriptionTuple;
}
