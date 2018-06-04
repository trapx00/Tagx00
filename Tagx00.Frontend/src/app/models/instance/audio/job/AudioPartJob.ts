import { AudioJob } from "./AudioJob";
import { TagDescriptionTuple } from "../../TagTuple";

export interface AudioPartTuple {
  startOffset: number;
  endOffset: number;
  tuple: TagDescriptionTuple;
}



export interface AudioPartJob extends AudioJob {
  tuple: AudioPartTuple;
}
