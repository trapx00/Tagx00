import { MissionCreateInfo } from "../MissionCreateInfo";

export class TextMissionCreateInfo extends MissionCreateInfo {
  get valid(): boolean {
    return false;
  }



}
