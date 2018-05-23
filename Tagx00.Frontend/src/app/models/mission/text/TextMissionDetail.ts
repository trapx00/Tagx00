import { MissionDetail } from "../Mission";
import { TextMissionSetting } from "./TextMissionProperties";


export interface TextMissionDetail extends  MissionDetail {
  textUrls: string[];
  settings: TextMissionSetting[];
}
