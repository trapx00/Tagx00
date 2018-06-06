import { WorkResult } from "../WorkResult";
import { VideoJob } from "./job/VideoJob";

export interface VideoResult extends WorkResult {
  videoUrl: string;
  job: VideoJob;
}
