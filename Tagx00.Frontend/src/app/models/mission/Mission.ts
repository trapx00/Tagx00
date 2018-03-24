export enum MissionType {
  IMAGE = "IMAGE"
}

export enum MissionState {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  ENDED = "ENDED",

}

export interface MissionPublicItem {
  missionId: number;
  title: string;
  description: string;
  topics: string[];
  allowCustomTag: boolean;
  allowedTags: string[];
  missionType: MissionType;
  start: Date;
  end: Date;
  coverUrl: string;
}

export interface MissionDetail {
  publicItem: MissionPublicItem;
  missionState: MissionState;
}
