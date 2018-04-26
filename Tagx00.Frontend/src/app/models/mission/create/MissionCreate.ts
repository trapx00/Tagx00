import { MissionProperties } from "../MissionProperties";
import { MissionType } from "../Mission";

export interface MissionCreate<T extends MissionProperties = MissionProperties> {
  title: string;
  description: string;
  topics: string[];
  allowCustomTag: boolean;
  allowedTags: string[];
  properties: T;
  start: Date;
  end: Date;
  level: number;
  credits: number;
  minimalWorkerLevel: number;
  missionType: MissionType;
}
