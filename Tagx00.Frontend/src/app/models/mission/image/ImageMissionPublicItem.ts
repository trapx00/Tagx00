
import { ImageMissionType } from "./ImageMission";
import { MissionPublicItem } from "../MissionPublicItem";
import { MissionType } from "../Mission";

export interface ImageMissionPublicItem extends MissionPublicItem {
  allowCustomTag: boolean;
  allowedTags: string[];
  missionTypes: ImageMissionType[];
  missionType: MissionType.IMAGE
}
