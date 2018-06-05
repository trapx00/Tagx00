import { MissionProperties } from "../MissionProperties";
import { AudioMissionType } from "../audio/AudioMission";
import { VideoMissionType } from "./VideoMission";

export interface VideoMissionProperties extends MissionProperties {
  allowCustomTag: string[];
  tags: string[];
  videoMissionTypes: VideoMissionType[];
}
