import { MissionProperties } from "../MissionProperties";

export interface MissionCreate<T extends MissionProperties = MissionProperties> {
  title: string;
  description: string;
  topics: string[];
  allowCustomTag: boolean;
  allowedTags: string[];
  properties: T;
  start: Date;
  end: Date;
}
