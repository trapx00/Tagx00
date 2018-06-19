import { UserInfo } from "./UserInfo";
import { UserRole } from "../user/User";

export interface RequesterInfo extends UserInfo{
    submittedMissionCount: number;
    instanceCount: number;
    submittedInstanceCount: number;
    inProgressInstanceCount: number;
    finalizedInstanceCount: number;
    abandonedInstanceCount: number;
}
