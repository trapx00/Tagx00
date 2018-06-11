import { AudioMissionType } from "./AudioMission";
import { MissionProperties } from "../MissionProperties";

export interface AudioMissionProperties extends MissionProperties {
  allowCustomTag: boolean;
  tags: string[];
  audioMissionTypes: AudioMissionType[];

}
