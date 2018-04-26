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
  requesterUsername: string;
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
  level:number;
  credits: number;
  minimalWorkerLevel: number;
}

export interface MissionDetail {
  publicItem: MissionPublicItem;
  missionState: MissionState;
}
