import { MissionProperties } from "../MissionProperties";
import { ImageMissionType } from "./ImageMission";

export interface ImageMissionProperties extends MissionProperties {
  imageMissionTypes: ImageMissionType[];
  allowCustomTag: boolean;
  allowedTags: {[s: string]: number};
}
