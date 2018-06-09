import { TextJob } from "./TextJob";
import { TextMissionType } from "../../../mission/text/TextMissionProperties";
import { TagTuple } from "../../TagTuple";

export interface TextClassificationJob extends TextJob {
  type: TextMissionType.CLASSIFICATION;
  tagTuples: TagTuple[];
}
