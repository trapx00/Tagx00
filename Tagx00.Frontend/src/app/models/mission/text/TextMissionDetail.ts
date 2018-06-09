
import { TextMissionSetting } from "./TextMissionProperties";
import { MissionDetail } from "../MissionDetail";
import { TextMissionPublicItem } from "./TextMissionPublicItem";


export interface TextMissionDetail extends  MissionDetail<TextMissionPublicItem> {
  tokens: string[];
  settings: TextMissionSetting[];
}
