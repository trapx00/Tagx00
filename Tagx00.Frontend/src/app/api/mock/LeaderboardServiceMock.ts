import { LeaderboardService } from "../LeaderboardService";
import { RequesterCreditBoardResponse } from "../../models/leaderboard/RequesterCreditBoardResponse";
import { RequesterCreditSelfRankResponse } from "../../models/leaderboard/RequesterCreditSelfRankResponse";
import { ExpSpecificWorkerLeaderboardResponse } from "../../models/leaderboard/WorkerExpSelfRankResponse";
import { CreditSpecificWorkerLeaderboardResponse } from "../../models/leaderboard/WorkerCreditSelfRankResponse";
import { WorkerExpBoardResponse } from "../../models/leaderboard/WorkerExpBoardResponse";
import { WorkerCreditBoardResponse } from "../../models/leaderboard/WorkerCreditBoardResponse";

export class LeaderboardServiceMock extends LeaderboardService {
  async getRequesterCreditBoard(pageSize: number, pageNumber: number): Promise<RequesterCreditBoardResponse> {
    return {
      pagingInfo:
        {
          totalCount: 8,
          currentPage:0,
          pageSize:5,
          totalPage:2,
        },
      users:
        [ {username:"123",credits:997,order:1},
          {username:"黄鹤老板",credits:518,order:2},
          {username:"MiFan",credits:489,order:3},
          {username:"1 2 3",credits:320,order:4},
          {username:"Hannibal",credits:598,order:5},
          {username:"🍓イチゴ🍓",credits:200,order:6},
          {username:"沙雕艺术家",credits:798,order:7},
          {username:"燕小六六六",credits:197,order:8}
        ]
    }as RequesterCreditBoardResponse;
  }

  async getSpecificRequesterRank(username: string): Promise<RequesterCreditSelfRankResponse> {
    return {
      user:
        {
          username: "123",
          credits: 999999,
          order: 1,
        }

    } as RequesterCreditSelfRankResponse;
  }


  async getWorkerCreditBoard(pageSize: number, pageNumber: number): Promise<WorkerCreditBoardResponse> {
    return {
      pagingInfo:
        {
          totalCount: 8,
          currentPage:0,
          pageSize:5,
          totalPage:2,
        },
      users:
        [ {username:"阿吉",credits:397,order:1},
          {username:"sErIouS",credits:255,order:2},
          {username:"烤面筋",credits:326,order:3},
          {username:"ひかり",credits:302,order:4},
          {username:"2+2=5",credits:199,order:5},
          {username:"刀马旦",credits:296,order:6},
          {username:"老歪脖子树",credits:193,order:7},
          {username:"一顾倾人城",credits:280,order:8},
        ]
    } as WorkerCreditBoardResponse;


  }

  async getSpecificWorkerCreditRank(username: string): Promise<CreditSpecificWorkerLeaderboardResponse> {
    return {
      user:
        {
          username: "worker",
          credits: 15,
          order: 2004,
        }
    } as CreditSpecificWorkerLeaderboardResponse;
  }

  async getWorkerExpBoard(pageSize: number, pageNumber: number): Promise<WorkerExpBoardResponse> {
    return {
      pagingInfo:
        {
          totalCount: 9,
          currentPage:0,
          pageSize:5,
          totalPage:2,
        },
      users:
        [ {username:"阿吉",exp:1000,level:10,order:1},
          {username:"Maria",exp:958,level:9,order:2},
          {username:"Lex" ,exp:905,level:9,order:3},
          {username:"谷哇莫",exp:801,level:9,order:4},
          {username:"魔法少女",exp:799,level:8,order:5},
          {username:"冯·陈独秀",exp:888,level:8,order:6},
          {username:"蔡长工",exp:886,level:8,order:7},
          {username:"一只煎饺",exp:880,level:8,order:8},
          {username:"芝士蛋糕",exp:878,level:8,order:9}
        ]
    }as WorkerExpBoardResponse;
  }

  async getSpecificWorkerExpRank(username: string): Promise<ExpSpecificWorkerLeaderboardResponse> {
    return {
      user:
        {
          username: "worker",
          exp: 150,
          level: 1,
          order: 2000,
        }
    } as ExpSpecificWorkerLeaderboardResponse;
  }
}
