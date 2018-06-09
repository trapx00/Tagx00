import { MissionDetail } from "../MissionDetail";
import { VideoMissionPublicItem } from "./VideoMissionPublicItem";

export enum VideoMissionType {
  WHOLE = "WHOLE",
  PART = "PART"
}

export interface VideoMissionDetail extends MissionDetail<VideoMissionPublicItem> {
  videoUrls: string[];
  videoMissionTypes: VideoMissionType[];
}
