
import { TextMissionSetting } from "./TextMissionProperties";
import { MissionDetail } from "../MissionDetail";
import { TextMissionPublicItem } from "./TextMissionPublicItem";


export interface TextMissionDetail extends  MissionDetail<TextMissionPublicItem> {
  textTokens: string[];
  settings: TextMissionSetting[];
}
