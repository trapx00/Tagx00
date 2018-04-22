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
import { WorkerCreditSelfRankResponse } from "../../models/leaderboard/WorkerCreditSelfRankResponse";
import { WorkerCreditBoardResponse } from "../../models/leaderboard/WorkerCreditBoardResponse";
import { WorkerExpSelfRankResponse } from "../../models/leaderboard/WorkerExpSelfRankResponse";
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

    if (Math.random()<0.5) {
      throw {
        statusCode: 404
      }
    }

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

  async getWorkerCreditBoard(pageSize: number, pageNumber: number, token: string): Promise<WorkerCreditBoardResponse> {
    return {
      pagingInfo:
        {
          totalCount: 8,
          currentPage:0,
          pageSize:5,
          totalPage:2,
        },
      creditBoardList:
        [ {username:"今天阿吉做任务了吗",credits:397,order:1},
          {username:"aREyOusErIouS",credits:355,order:2},
          {username:"我在清华烤面筋",credits:326,order:3},
          {username:"おひかりしゃ💫",credits:302,order:4},
          {username:"2+2=5",credits:299,order:5},
          {username:"耍fa♂枪的刀马旦",credits:296,order:6},
          {username:"那棵老歪脖子树天天在皇宫后面盯着你们呐",credits:293,order:7},
          {username:"一顾倾人城",credits:280,order:8},
        ]
    } as WorkerCreditBoardResponse;


  }

  async getSpecificWorkerCreditRank(username: string, token:string): Promise<WorkerCreditSelfRankResponse> {
    return {
      workerCreditSelfRank:
        {
          username: "worker",
          credits: 15,
          order: 2004,
        }
    } as WorkerCreditSelfRankResponse;
  }

  async getWorkerExpBoard(pageSize: number, pageNumber: number, token: string): Promise<WorkerExpBoardResponse> {
    return {
      pagingInfo:
        {
          totalCount: 9,
          currentPage:0,
          pageSize:5,
          totalPage:2,
        },
      expBoardList:
        [ {username:"今天阿吉做标注任务了吗",exp:1000,level:10,order:1},
          {username:"Maaaariaaaaa",exp:958,level:9,order:2},
          {username:"Lex" ,exp:955,level:9,order:3},
          {username:"谷哇莫",exp:901,level:9,order:4},
          {username:"俺わ魔法少女です",exp:899,level:8,order:5},
          {username:"凡希特·冯·陈独秀",exp:888,level:8,order:6},
          {username:"蔡长工家的科幻迷阿斗",exp:886,level:8,order:7},
          {username:"一只煎饺",exp:880,level:8,order:8},
          {username:"如果有来生我想当一块芝士蛋糕",exp:878,level:8,order:9}
          ]
    }as WorkerExpBoardResponse;
  }

  async getSpecificWorkerExpRank(username: string, token:string): Promise<WorkerExpSelfRankResponse> {
    return {
      workerExpSelfRank:
        {
          username: "worker",
          exp: 150,
          level: 1,
          order: 2000,
        }
    } as WorkerExpSelfRankResponse;
  }

}

