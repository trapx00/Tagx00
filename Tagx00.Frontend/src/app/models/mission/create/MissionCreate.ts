import { MissionProperties } from "../MissionProperties";
import { MissionType } from "../Mission";

export interface MissionCreate {
  title: string;
  description: string;
  topics: string[];
  properties: MissionProperties;
  start: Date;
  end: Date;
  level: number;
  credits: number;
  minimalWorkerLevel: number;
}
