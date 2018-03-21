import { ImageJob } from "./job/ImageJob";

export interface ImageResult {
  id: number;

  instanceId: number;

  imageJob: ImageJob;

  url: string;
}
