import { Injectable } from "react.di";
import { AdminService } from "../AdminService";
import { AdminInfo } from "../../models/admin/AdminInfo";
import { MissionState, MissionType } from "../../models/mission/Mission";
import { RequesterInfo } from "../../models/userInfo/RequesterInfo";
import { UserRole } from "../../models/user/User";
import { WorkerInfo } from "../../models/userInfo/WorkerInfo";
import { UserInfo } from "../../models/userInfo/UserInfo";
import { createUnzip } from "zlib";
import { MissionBrief } from "../../models/admin/MissionBrief";


function createRandomString(time: number){

  return [...Array(time)].map( x =>Math.floor(Math.random()*120)+"");
}


function createRequester(time: number, registerDate: string = "2018-6-2"): RequesterInfo[] {
  return [...Array(time)].map(x => ({
    username: "requester "+x,
    email: "smallda@outlook.com",
    role: UserRole.ROLE_REQUESTER,
    avatarUrl: "https://en.gravatar.com/userimage/57315252/e9c37404163b4b2e73fd72003e391aac.jpg?size=200",
    registerDate: registerDate,
    submittedMissionCount: 20,
  instanceCount: 40,
  submittedInstanceCount: 10,
  inProgressInstanceCount: 10,
  finalizedInstanceCount: 10,
  abandonedInstanceCount: 10,
  }))
}

function createWorker(time: number, registerDate: string = "2018-5-8"): WorkerInfo[] {
  return [...Array(time)].map(x => ({
    username: "worker "+x,
    email: "smallda@outlook.com",
    role: UserRole.ROLE_WORKER,
    registerDate: registerDate,
    avatarUrl: "https://en.gravatar.com/userimage/57315252/e9c37404163b4b2e73fd72003e391aac.jpg?size=200",
    credits: 10,
  exp: 20,
  level: 10,
  completedMissionCount: 20,
  acceptedMissionCount: 23,
  inProgressMissionCount: 10,
  abandonedMissionCount: 11,
  finalizedMissionCount: 12
  }))
}

function createMission(time: number, missionType: MissionType): MissionBrief[] {
  return [...Array(time)].map(x => ({
    missionId: "mission",
    missionType: missionType,
    missionState: MissionState.ACTIVE
  }))
}

@Injectable
export class AdminServiceMock extends AdminService {


  async getAdminInfo(): Promise<AdminInfo> {
    return {

      user: {
        requesters: createRequester(20,"2018-4-27"),
        workers: createWorker(15),
        registerDateDistribution: {"2018-4-27": createRequester(2,"2018-4-27"), "2018-4-28": createWorker(3,"2018-4-28"), "2018-4-29": createWorker(4), "2018-5-1": createRequester(1,"2018-5-1")},
      },

      mission: {
        typeStateDistribution: {
          [MissionType.IMAGE]: { active: createMission(10,MissionType.IMAGE), pending: createMission(10,MissionType.IMAGE), ended:createMission(10,MissionType.IMAGE)},
          [MissionType.TEXT]: { active: createMission(11,MissionType.TEXT), pending: createMission(19,MissionType.TEXT), ended: createMission(14,MissionType.TEXT)},
          [MissionType.AUDIO]: { active: createMission(5,MissionType.AUDIO), pending: createMission(17,MissionType.AUDIO), ended: createMission(4,MissionType.AUDIO)},
          [MissionType.VIDEO]: { active: createMission(2,MissionType.AUDIO), pending: createMission(20,MissionType.AUDIO), ended: createMission(23,MissionType.AUDIO)},
          [MissionType.THREE_DIMENSION]: { active: createMission(0,MissionType.AUDIO), pending: createMission(1,MissionType.AUDIO), ended: createMission(12,MissionType.AUDIO)},
        },
      },

      instance: {
        acceptDateDistribution: {"2018-4-27": createRandomString(5), "2018-4-28": createRandomString(10), "2018-4-29": createRandomString(11), "2018-5-1": createRandomString(15)},
        typeStateDistribution: {
          [MissionType.IMAGE]: {inProgress: createRandomString(10), submitted: createRandomString(20), abandoned: createRandomString(10), finalized: createRandomString(20)},
          [MissionType.TEXT]: {inProgress: createRandomString(10), submitted: createRandomString(20), abandoned: createRandomString(10), finalized: createRandomString(20)},
          [MissionType.AUDIO]: {inProgress: createRandomString(10), submitted: createRandomString(20), abandoned: createRandomString(10), finalized: createRandomString(20)},
          [MissionType.VIDEO]: {inProgress: createRandomString(12), submitted: createRandomString(22), abandoned: createRandomString(10), finalized: createRandomString(20)},
          [MissionType.THREE_DIMENSION]: {inProgress: createRandomString(10), submitted: createRandomString(0), abandoned: createRandomString(9), finalized: createRandomString(20)},

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

  async getUsers(): Promise<UserInfo[]> {
    return [...createRequester(20), ...createWorker(15)];
  }
}
