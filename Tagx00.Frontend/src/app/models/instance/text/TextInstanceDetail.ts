import { TextResult } from "./TextResult";
import { InstanceDetail } from "../InstanceDetail";
import { MissionType } from "../../mission/Mission";

export interface TextInstanceDetail extends InstanceDetail {
  missionType: MissionType.TEXT;
  textResults: TextResult[];
}
