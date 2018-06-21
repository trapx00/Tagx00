import { UserInfo } from "./UserInfo";
import { UserRole } from "../user/User";

export interface RequesterInfo extends UserInfo{
    pendingMissionCount: number;
    activeMissionCount: number;
    endedMissionCount: number;
}
