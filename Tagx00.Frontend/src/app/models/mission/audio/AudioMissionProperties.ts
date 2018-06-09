import { AudioMissionType } from "./AudioMission";
import { MissionProperties } from "../MissionProperties";

export interface AudioMissionProperties extends MissionProperties {

  allowCustomTag: string[];
  tags: string[];
  missionTypes: AudioMissionType[];

}
