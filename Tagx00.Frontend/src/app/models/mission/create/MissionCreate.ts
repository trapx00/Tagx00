import { MissionProperties } from "../MissionProperties";

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
