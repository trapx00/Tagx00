import { MissionType } from "./Mission";

export interface MissionPublicItem {
  missionId: string;
  requesterUsername: string;
  title: string;
  description: string;
  topics: string[];
  missionType: MissionType;
  start: Date;
  end: Date;
  coverUrl: string;

  jobCount: number;
  level:number;
  credits: number;
  minimalWorkerLevel: number;
}
