import { AudioJob } from "./AudioJob";
import { TagDescriptionTuple } from "../../TagTuple";

export interface AudioWholeJob extends AudioJob {
  tuple: TagDescriptionTuple;
}
