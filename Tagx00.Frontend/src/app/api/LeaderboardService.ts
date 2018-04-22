import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";
import { RequesterCreditBoardResponse } from "../models/leaderboard/RequesterCreditBoardResponse";
import { RequesterCreditSelfRankResponse } from "../models/leaderboard/RequesterCreditSelfRankResponse";
import { ExpSpecificWorkerLeaderboardResponse } from "../models/leaderboard/WorkerExpSelfRankResponse";
import { CreditSpecificWorkerLeaderboardResponse } from "../models/leaderboard/WorkerCreditSelfRankResponse";
import { WorkerExpBoardResponse } from "../models/leaderboard/WorkerExpBoardResponse";
import { WorkerCreditBoardResponse } from "../models/leaderboard/WorkerCreditBoardResponse";

@Injectable
export class LeaderboardService {

  constructor(@Inject private http: HttpService) {
  }


  async getRequesterCreditBoard(pageSize: number, pageNumber: number): Promise<RequesterCreditBoardResponse> {
    const res = await this.http.fetch({
      path: "leaderboard/credits/requester",
    });
    return res.response;
  }

  async getSpecificRequesterRank(username: string): Promise<RequesterCreditSelfRankResponse> {
    const res = await this.http.fetch({
      path: `leaderboard/credits/requester/${username}`,
    });
    return res.response;
  }

  async getWorkerCreditBoard(pageSize: number, pageNumber: number): Promise<WorkerCreditBoardResponse> {
    const res = await this.http.fetch({
      path: "leaderboard/credits/worker",
    });
    return res.response;
  }

  async getSpecificWorkerCreditRank(username: string): Promise<CreditSpecificWorkerLeaderboardResponse> {
    const res = await this.http.fetch({
      path: `leaderboard/credits/worker/${username}`,
    });
    return res.response;
  }

  async getWorkerExpBoard(pageSize: number, pageNumber: number): Promise<WorkerExpBoardResponse> {
    const res = await this.http.fetch({
      path: "leaderboard/exp",
    });
    return res.response;
  }

  async getSpecificWorkerExpRank(username: string): Promise<ExpSpecificWorkerLeaderboardResponse> {
    const res = await this.http.fetch({
      path: `leaderboard/exp/${username}`,
    });
    return res.response;
  }
}
