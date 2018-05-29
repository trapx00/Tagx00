import { MissionProperties } from "../MissionProperties";

export enum TextMissionType {
  KEYWORDS = "KEYWORDS",
  CLASSIFICATION = "CLASSIFICATION"
}


export interface TextMissionSetting {
  textMissionType: TextMissionType;
}

export interface TextMissionClassificationSetting extends TextMissionSetting{
  textMissionType: TextMissionType.CLASSIFICATION;
  classes: string[];
}

export interface TextMissionKeywordsSetting extends TextMissionSetting {
  textMissionType: TextMissionType.KEYWORDS;
  keywords: string[];
}

export interface TextMissionProperties extends MissionProperties {
  settings: TextMissionSetting[];
}
