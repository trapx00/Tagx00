import { MissionProperties } from "../MissionProperties";

export interface ThreeDimensionMissionProperties extends MissionProperties {
  allowCustomTag: string[];
  tags: string[];
}
