import { MissionPublicItem } from "../MissionPublicItem";
import { MissionType } from "../Mission";
import { AudioMissionType } from "../audio/AudioMission";
import { VideoMissionType } from "./VideoMission";

export interface VideoMissionPublicItem extends MissionPublicItem {
  allowCustomTag: boolean;
  tags: string[];
  missionType: MissionType.VIDEO;
}
