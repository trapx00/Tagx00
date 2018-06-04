import { MissionProperties } from "../MissionProperties";
import { AudioMissionType } from "../audio/AudioMission";

export interface VideoMissionProperties extends MissionProperties {
  allowCustomTag: string[];
  tags: string[];
  missionTypes: VideoMissionTypes[];
}
