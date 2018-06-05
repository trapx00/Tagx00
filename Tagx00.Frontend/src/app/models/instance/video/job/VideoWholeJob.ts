import { VideoJob } from "./VideoJob";
import { TagDescriptionTuple } from "../../TagTuple";

export interface VideoWholeJob extends VideoJob {
  tuple: TagDescriptionTuple;
}
