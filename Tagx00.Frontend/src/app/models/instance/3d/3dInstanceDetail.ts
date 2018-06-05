import { InstanceDetail } from "../InstanceDetail";
import { ThreeDimensionJob } from "./job/3dJob";
import { ThreeDimensionResult } from "./3dResult";
import { MissionType } from "../../mission/Mission";

export interface ThreeDimensionInstanceDetail extends InstanceDetail {
  resultList: ThreeDimensionResult[];
  missionType: MissionType.THREE_DIMENSION;
}
