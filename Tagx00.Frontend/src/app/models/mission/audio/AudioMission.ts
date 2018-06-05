import { MissionDetailPage } from "../../../pages/MissionPage/MissionDetailPage";
import { MissionDetail } from "../MissionDetail";

export enum AudioMissionType {
  WHOLE = "WHOLE",
  PART = "PART"
}

export interface AudioMissionDetail extends MissionDetail {
  audioUrls: string[];
  audioMissionTypes: AudioMissionType[];

}
