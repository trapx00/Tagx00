import { WorkResult } from "../WorkResult";
import { ImageJob } from "../image/job/ImageJob";
import { ThreeDimensionModel } from "../../mission/3d/3dModel";
import { ThreeDimensionJob } from "./job/3dJob";

export interface ThreeDimensionResult extends WorkResult {
  job: ThreeDimensionJob;
  token: string;
}
