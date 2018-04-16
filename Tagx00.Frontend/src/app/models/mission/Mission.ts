export enum MissionType {
  IMAGE = "IMAGE"
}

export enum MissionState {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  ENDED = "ENDED",

}

export interface MissionPublicItem {
  missionId: string;
  title: string;
  description: string;
  topics: string[];
  allowCustomTag: boolean;
  allowedTags: string[];
  missionType: MissionType;
  start: Date;
  end: Date;
  coverUrl: string;
  jobCount: number;
}

export interface MissionDetail {
  publicItem: MissionPublicItem;
  missionState: MissionState;
}
