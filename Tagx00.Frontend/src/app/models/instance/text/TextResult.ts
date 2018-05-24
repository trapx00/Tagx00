import { WorkResult } from "../WorkResult";
import { TextJob } from "./job/TextJob";

export interface TextResult extends WorkResult {
  url: string;
  textJob: TextJob;
}
