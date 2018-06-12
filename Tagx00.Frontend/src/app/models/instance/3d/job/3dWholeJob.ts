import { ThreeDimensionJob } from "./3dJob";
import { TagDescriptionTuple } from "../../TagTuple";
import { ThreeDimensionMissionDetail, ThreeDimensionMissionType } from "../../../mission/3d/3dMission";

export interface ThreeDimensionWholeJob extends ThreeDimensionJob {
  type: ThreeDimensionMissionType.WHOLE;
  tuple: TagDescriptionTuple;
}
