import { MissionDetail } from "../MissionDetail";
import { ImageMissionPublicItem } from "./ImageMissionPublicItem";
import { MissionAsset } from "../MissionAsset";


export enum ImageMissionType {
  DISTRICT = "DISTRICT",
  WHOLE = "WHOLE",
  PART = "PART"
}

export interface ImageMissionDetail extends MissionDetail<ImageMissionPublicItem> {
  missionAssets: MissionAsset[];
}
