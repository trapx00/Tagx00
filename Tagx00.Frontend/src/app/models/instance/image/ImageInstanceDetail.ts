import { InstanceDetail } from "../InstanceDetail";
import { ImageResult } from "./ImageResult";

export interface ImageInstanceDetailVo extends InstanceDetail {
  results: ImageResult[];

}
