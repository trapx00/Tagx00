import { MissionPublicItem } from "../MissionPublicItem";
import { MissionType } from "../Mission";

export interface ThreeDimensionPublicItem extends MissionPublicItem {
  allowCustomTag: boolean;
  tags: string[];
  missionType: MissionType.THREE_DIMENSION;
}
