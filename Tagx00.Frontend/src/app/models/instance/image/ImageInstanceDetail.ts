import { InstanceDetail } from "../InstanceDetail";
import { ImageResult } from "./ImageResult";

export interface ImageInstanceDetail extends InstanceDetail {
  imageResults: ImageResult[];

}
