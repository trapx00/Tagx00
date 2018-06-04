import { MissionDetail } from "../MissionDetail";

export enum VideoMissionType {
  WHOLE = "WHOLE",
  PART = "PART"
}

export interface VideoMissionDetail extends MissionDetail {
  videoUrls: string[];
  videoMissionTypes: VideoMissionType[];
}
