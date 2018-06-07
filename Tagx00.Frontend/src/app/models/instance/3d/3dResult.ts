import { WorkResult } from "../WorkResult";
import { ImageJob } from "../image/job/ImageJob";
import { ThreeDimensionModelUrl } from "../../mission/3d/3dModelUrl";
import { ThreeDimensionJob } from "./job/3dJob";

export interface ThreeDimensionResult extends WorkResult {
  job: ThreeDimensionJob;
  url: ThreeDimensionModelUrl;
}
