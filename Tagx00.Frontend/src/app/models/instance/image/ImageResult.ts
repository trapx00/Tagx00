import { ImageJob } from "./job/ImageJob";

export interface ImageResult {
  id: number;

  instanceId: string;

  imageJob: ImageJob;

  url: string;

  isDone: boolean;
}
