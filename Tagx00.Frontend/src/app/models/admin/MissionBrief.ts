import { MissionState, MissionType } from "../mission/Mission";

export interface MissionBrief {
  missionId: string;
  missionType: MissionType;
  missionState: MissionState;
}
