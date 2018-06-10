import { MissionProperties } from "../MissionProperties";

export interface ThreeDimensionMissionProperties extends MissionProperties {
  allowCustomTag: boolean;
  tags: string[];
}
