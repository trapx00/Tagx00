import { ImageJob } from "./job/ImageJob";
import { WorkResult } from "../WorkResult";

export interface ImageResult extends WorkResult {
  imageJob: ImageJob;

  url: string;
}
