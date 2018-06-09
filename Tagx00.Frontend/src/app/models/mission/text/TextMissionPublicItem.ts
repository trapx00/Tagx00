import { TextMissionType } from "./TextMissionProperties";
import { MissionPublicItem } from "../MissionPublicItem";
import { MissionType } from "../Mission";

export interface TextMissionPublicItem extends MissionPublicItem {
  missionTypes: TextMissionType[];
  missionType: MissionType.TEXT;
}
