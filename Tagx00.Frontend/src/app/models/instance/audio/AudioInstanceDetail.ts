import { InstanceDetail } from "../InstanceDetail";
import { MissionType } from "../../mission/Mission";
import { AudioResult } from "./AudioResult";

export interface AudioInstanceDetail extends InstanceDetail {
  resultList: AudioResult[];
  missionType: MissionType.AUDIO;
}
