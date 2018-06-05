import { WorkResult } from "../WorkResult";
import { AudioJob } from "./job/AudioJob";

export interface AudioResult extends WorkResult {
  audioUrl: string;
  job: AudioJob;
}
