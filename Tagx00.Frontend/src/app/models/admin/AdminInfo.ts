import { MissionType } from "../mission/Mission";
import { RequesterInfo } from "../userInfo/RequesterInfo";
import { WorkerInfo } from "../userInfo/WorkerInfo";
import { UserInfo } from "../userInfo/UserInfo";
import { MissionBrief } from "./MissionBrief";



export interface AdminInfo {

  mission: {
    typeStateDistribution: {[missionType in MissionType]: { active: MissionBrief[], pending: MissionBrief[], ended: MissionBrief[]}};
  };

  instance: {
    acceptDateDistribution: {[date: string]: string[]};
    typeStateDistribution: {[missionType in MissionType]: { inProgress: string[], submitted: string[], finalized: string[], abandoned: string[] }};
  };

  user: {
    requesters: string[];
    workers: string[];
    registerDateDistribution: {[date: string]: string[]};
  },


  credit: {
    requesterCredits: number;
    workerCredits: number;
    missionCredits: number;
    typeDistribution: {[m in MissionType]: { low: number, q1:number, median: number, q3: number, high: number }};
  }

}
