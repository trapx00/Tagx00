import { MissionPublicItem } from "../MissionPublicItem";
import { MissionType } from "../Mission";
import { ImageMissionType } from "../image/ImageMission";
import { AudioMissionType } from "./AudioMission";

export interface AudioMissionPublicItem extends MissionPublicItem {
  allowCustomTag: boolean;
  tags: string[];
  audioMissionTypes: AudioMissionType[];
  missionType: MissionType.AUDIO;
}
