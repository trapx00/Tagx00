import { HttpService } from "./HttpService";
import { Instance } from "../models/instance/Instance";
import { InstanceDetail } from "../models/instance/InstanceDetail";
import { ImageInstanceDetail } from "../models/instance/image/ImageInstanceDetail";
import { HttpMethod } from "./utils";
import { Response } from "../models/response/Response";
import { Inject, Injectable } from "react.di";
import {WorkerInfo} from "../models/userInfo/WorkerInfo";
import { InstanceDetailResponse } from "../models/response/mission/InstanceDetailResponse";
import { WorkerExpSelfRankResponse } from "../models/leaderboard/WorkerExpSelfRankResponse";
import { WorkerExpBoardResponse } from "../models/leaderboard/WorkerExpBoardResponse";
import { WorkerCreditSelfRankResponse } from "../models/leaderboard/WorkerCreditSelfRankResponse";
import { WorkerCreditBoardResponse } from "../models/leaderboard/WorkerCreditBoardResponse";

@Injectable
export class WorkerService {

  constructor(@Inject private http: HttpService) {
  }

  async getAllInstances(token: string): Promise<Instance[]> {

    const res = await this.http.fetch({
      token: token,
      path: "/mission/worker"
    });
    return res.response.instances as Instance[];

  }

  async getInstanceDetail(missionId: string, token: string): Promise<InstanceDetailResponse> {


    const res = await this.http.fetch({
      token: token,
      path: `/mission/worker/${missionId}`,
    });
    if (res.ok) {
      return res.response as InstanceDetailResponse;
    } else {
      throw res.error;
    }

  }

  async saveProgress(missionId: string, detail: InstanceDetail, token: string): Promise<boolean> {
    const res = await this.http.fetch({
      token: token,
      path: `/mission/worker/${missionId}`,
      body: detail,
      method: HttpMethod.PUT
    });

    return res.ok;
  }

  async submit(missionId: string, detail: InstanceDetail, token: string): Promise<boolean> {
    const res = await this.http.fetch({
      token: token,
      path: `/mission/worker/${missionId}`,
      method: HttpMethod.POST,
      body: detail
    });

    return res.ok;
  }

  async acceptMission(missionId: string, token: string): Promise<Response> {
    const res = await this.http.fetch({
      path: `/mission/worker/${missionId}`,
      body: {instance: null},
      token,
      method: HttpMethod.POST
    });

    return res.response;
    
  }

  async getWorkerInfo(username: string, token: string): Promise<WorkerInfo> {
      const res = await this.http.fetch({
          path: `/mission/worker/${username}`,
          token: token,
      });
      return res.response.instances as WorkerInfo;
  }

  async abandonMission(missionId: string, token: string): Promise<Response> {
    const res = await this.http.fetch({
      path: `mission/worker/${missionId}`,
      token,
      method: HttpMethod.DELETE
    });

    return res.response;
  }

  async getWorkerCreditBoard(pageSize: number, pageNumber: number, token: string): Promise<WorkerCreditBoardResponse> {
    const res = await this.http.fetch({
      path: "LeaderboardPage/credits/worker",
      token
    });
    return res.response;
  }

  async getSpecificWorkerCreditRank(username: string, token:string): Promise<WorkerCreditSelfRankResponse> {
    const res = await this.http.fetch({
      path: `leaderboard/credits/worker/${username}`,
      token
    });
    return res.response;
  }

  async getWorkerExpBoard(pageSize: number, pageNumber: number, token: string): Promise<WorkerExpBoardResponse> {
    const res = await this.http.fetch({
      path: "LeaderboardPage/exp",
      token
    });
    return res.response;
  }

  async getSpecificWorkerExpRank(username: string, token:string): Promise<WorkerExpSelfRankResponse> {
    const res = await this.http.fetch({
      path: `leaderboard/exp/${username}`,
      token
    });
    return res.response;
  }

}
