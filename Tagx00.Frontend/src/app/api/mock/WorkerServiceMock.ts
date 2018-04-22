import { Injectable } from "react.di";
import { Instance } from "../../models/instance/Instance";
import { MissionInstanceState } from "../../models/instance/MissionInstanceState";
import { ImageInstanceDetail } from "../../models/instance/image/ImageInstanceDetail";
import { InstanceDetail } from "../../models/instance/InstanceDetail";
import { Response } from "../../models/response/Response";
import { WorkerService } from "../WorkerService";
import {WorkerInfo} from "../../models/userInfo/WorkerInfo";
import { MissionType } from "../../models/mission/Mission";
import { HttpMethod } from "../utils";
import { InstanceDetailResponse } from "../../models/response/mission/InstanceDetailResponse";
import { CreditSpecificWorkerLeaderboardResponse } from "../../models/leaderboard/WorkerCreditSelfRankResponse";
import { WorkerCreditBoardResponse } from "../../models/leaderboard/WorkerCreditBoardResponse";
import { ExpSpecificWorkerLeaderboardResponse } from "../../models/leaderboard/WorkerExpSelfRankResponse";
import { WorkerExpBoardResponse } from "../../models/leaderboard/WorkerExpBoardResponse";

@Injectable
export class WorkerServiceMock extends WorkerService {

  async getAllInstances(token: string): Promise<Instance[]> {
    //mock
    return [1, 2, 3, 4, 5].map(x =>
      ({
        instanceId: x+"",
        workerUsername: "123",
        title: `Title${x}`,
        description: `Description `.repeat(x),
        missionId: "123",
        acceptDate: new Date(),
        submitDate: x % 2 === 0 ? new Date() : null,
        isSubmitted: x % 2 === 0,
        completedJobsCount: x * 2,
        missionInstanceState: x % 2 === 0
          ? MissionInstanceState.SUBMITTED
          : MissionInstanceState.IN_PROGRESS,
      })
    );

  }

  async getInstanceDetail(missionId: string, token: string): Promise<InstanceDetailResponse> {

    // if (Math.random()<0.5) {
    //   throw {
    //     statusCode: 404
    //   }
    // }

    // mock
    return {
      detail: {
        imageResults: [],
        instance: {
          instanceId: 1 + "",
          workerUsername: "123",
          title: `Title`,
          description: `Description `,
          missionId: missionId,
          acceptDate: new Date(),
          submitDate: null,
          isSubmitted: false,
          completedJobsCount: 0,
          missionInstanceState: MissionInstanceState.IN_PROGRESS,
        },
        missionType: MissionType.IMAGE,
      } as ImageInstanceDetail
    };
  }

  async saveProgress(missionId: string, detail: InstanceDetail, token: string): Promise<boolean> {
    return true;
  }

  async submit(missionId: string, detail: InstanceDetail, token: string): Promise<boolean> {
    return true;
  }

  async acceptMission(missionId: string, token: string): Promise<Response> {
    return {
      infoCode: 10000,
      description: "success"
    };
  }

  async getWorkerInfo(username: string, token: string): Promise<WorkerInfo> {
      return {
          username: "worker",
          email: "1@1.com",
          credits: 23,
          exp: 150,
          level: 1,
          completedMissionCount: 7,
          acceptedMissionCount: 12,
          inProgressMissionCount: 3,
          abandonedMissionCount: 2,
      } as WorkerInfo
  }

  async abandonMission(missionId: string, token: string): Promise<Response> {
    return {
      infoCode: 10000,
      description: "success"
    };
  }

}

