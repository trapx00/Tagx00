import { MissionDetail } from "../Mission";

export enum TextMissionType {
  TOPIC,
  CLASSIFICATION
}


export interface TextMissionDetail extends  MissionDetail {
  textUrls: string[];
  textMissionTypes: TextMissionType[];
}
