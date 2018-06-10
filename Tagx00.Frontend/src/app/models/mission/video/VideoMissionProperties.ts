import { MissionProperties } from "../MissionProperties";
import { AudioMissionType } from "../audio/AudioMission";
import { VideoMissionType } from "./VideoMission";

export interface VideoMissionProperties extends MissionProperties {
  allowCustomTag: boolean;
  tags: string[];
  videoMissionTypes: VideoMissionType[];
}
