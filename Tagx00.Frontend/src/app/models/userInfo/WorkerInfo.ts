import { UserInfo } from "./UserInfo";
import { UserRole } from "../user/User";

export interface WorkerInfo extends UserInfo {
    credits: number;
    exp: number;
    level: number;
    completedMissionCount: number;
    acceptedMissionCount: number;
    inProgressMissionCount: number;
    abandonedMissionCount: number;
    finalizedMissionCount: number;
}
