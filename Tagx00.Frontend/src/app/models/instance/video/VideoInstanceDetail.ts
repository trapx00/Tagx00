import { InstanceDetail } from "../InstanceDetail";
import { VideoResult } from "./VideoResult";
import { MissionType } from "../../mission/Mission";

export interface VideoInstanceDetail extends InstanceDetail {
  resultList: VideoResult[];
  missionType: MissionType.VIDEO;
}
