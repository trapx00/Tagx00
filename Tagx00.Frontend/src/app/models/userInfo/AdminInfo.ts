import { MissionType } from "../mission/Mission";

export interface AdminInfo {

  mission: {
    typeStateDistribution: {[missionType in MissionType]: { active: number, pending: number, ended: number}};
  };

  instance: {
    acceptDateDistribution: {[date: string]: number};
    typeStateDistribution: {[missionType in MissionType]: { inProgress: number, submitted: number, finalized: number, abandoned: number }};
  };

  user: {
    requesterCount: number;
    workerCount: number;
    registerDateDistribution: {[date: string]: number};
  },


  credit: {
    requesterCredits: number;
    workerCredits: number;
    missionCredits: number;
    typeDistribution: {[m in MissionType]: { low: number, q1:number, median: number, q3: number, high: number }};
  }

}
