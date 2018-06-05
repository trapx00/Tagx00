import { MissionDetailPage } from "../../../pages/MissionPage/MissionDetailPage";
import { MissionDetail } from "../MissionDetail";
import { AudioMissionPublicItem } from "./AudioMissionPublicItem";

export enum AudioMissionType {
  WHOLE = "WHOLE",
  PART = "PART"
}

export interface AudioMissionDetail extends MissionDetail<AudioMissionPublicItem> {
  audioUrls: string[];
  audioMissionTypes: AudioMissionType[];

}
