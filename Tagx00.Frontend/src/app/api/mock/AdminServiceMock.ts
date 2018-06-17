import { Injectable } from "react.di";
import { AdminService } from "../AdminService";
import { AdminInfo } from "../../models/userInfo/AdminInfo";
import { MissionType } from "../../models/mission/Mission";


@Injectable
export class AdminServiceMock extends AdminService {


  async getAdminInfo(): Promise<AdminInfo> {
    return {

      user: {
        requesterCount: 100,
        workerCount: 100,
        registerDateDistribution: {"2018-4-27": 5, "2018-4-28": 10, "2018-4-29": 11, "2018-5-1": 15},
      },

      mission: {
        typeStateDistribution: {
          [MissionType.IMAGE]: { active: 10, pending: 10, ended: 10},
          [MissionType.TEXT]: { active: 11, pending: 19, ended: 14},
          [MissionType.AUDIO]: { active: 5, pending: 17, ended: 4},
          [MissionType.VIDEO]: { active: 2, pending: 20, ended: 23},
          [MissionType.THREE_DIMENSION]: { active: 0, pending: 1, ended: 12},
        },
      },

      instance: {
        acceptDateDistribution: {"2018-4-27": 5, "2018-4-28": 10, "2018-4-29": 11, "2018-5-1": 15},
        typeStateDistribution: {
          [MissionType.IMAGE]: {inProgress: 10, submitted: 20, abandoned: 10, finalized: 20},
          [MissionType.TEXT]: {inProgress: 10, submitted: 20, abandoned: 10, finalized: 20},
          [MissionType.AUDIO]: {inProgress: 10, submitted: 20, abandoned: 10, finalized: 20},
          [MissionType.VIDEO]: {inProgress: 12, submitted: 22, abandoned: 10, finalized: 20},
          [MissionType.THREE_DIMENSION]: {inProgress: 10, submitted: 0, abandoned: 9, finalized: 20},

        }
      },
      credit: {
        requesterCredits: 100,
        workerCredits: 20,
        missionCredits: 12,
        typeDistribution: {
          [MissionType.IMAGE]: {low: 0, q1: 20, median:25, q3: 30, high: 100},
          [MissionType.TEXT]: {low: 0, q1: 2, median:23, q3: 24, high: 25},
          [MissionType.AUDIO]: {low: 20, q1: 23, median:25, q3: 30, high: 35},
          [MissionType.VIDEO]: {low: 0, q1: 20, median:25, q3: 30, high: 100},
          [MissionType.THREE_DIMENSION]: {low: 0, q1: 20, median:25, q3: 30, high: 100},
        }
        }
      }


  };
}
