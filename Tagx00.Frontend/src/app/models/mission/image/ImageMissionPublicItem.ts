
import { ImageMissionType } from "./ImageMission";
import { MissionPublicItem } from "../MissionPublicItem";
import { MissionType } from "../Mission";

export interface ImageMissionPublicItem extends MissionPublicItem {
  allowCustomTag: boolean;
  imageMissionTypes: ImageMissionType[];
  missionType: MissionType.IMAGE
}
