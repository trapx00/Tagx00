import { ThreeDimensionJob } from "../../instance/3d/job/3dJob";
import { MissionDetail } from "../MissionDetail";
import { ThreeDimensionModelUrl } from "./3dModelUrl";
import { ThreeDimensionPublicItem } from "./3dMissionPublicItem";

export enum ThreeDimensionMissionType {
  WHOLE = "WHOLE"
}

export interface ThreeDimensionMissionDetail extends MissionDetail<ThreeDimensionPublicItem> {
  models: ThreeDimensionModelUrl[];
}
