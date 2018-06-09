import { VideoJob } from "./VideoJob";
import { TagDescriptionTuple } from "../../TagTuple";

export interface VideoPartTuple {
  startOffset: number;
  endOffset: number;
  tuple: TagDescriptionTuple;
}

export interface VideoPartJob extends VideoJob {
  tupleList: VideoPartTuple[];
}
