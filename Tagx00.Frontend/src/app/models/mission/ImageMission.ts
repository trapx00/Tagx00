import { MissionDetail } from "./Mission";

export enum ImageMissionType {
  DISTRICT = "DISTRICT",
  WHOLE = "WHOLE",
  PART = "PART"
}

export interface ImageMissionDetail extends MissionDetail {
  imageUrls: string[];
  imageMissionTypes: ImageMissionType[];
}
