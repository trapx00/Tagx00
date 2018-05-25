import { MissionDetail } from "../MissionDetail";
import { ImageMissionPublicItem } from "./ImageMissionPublicItem";


export enum ImageMissionType {
  DISTRICT = "DISTRICT",
  WHOLE = "WHOLE",
  PART = "PART"
}

export interface ImageMissionDetail extends MissionDetail<ImageMissionPublicItem> {
  imageUrls: string[];
  imageMissionTypes: ImageMissionType[];
}
