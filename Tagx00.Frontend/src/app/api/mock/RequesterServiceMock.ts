import { ImageUploadResponse } from "../../models/mission/image/ImageUploadResponse";
import { MissionCreateResponse } from "../../models/mission/create/MissionCreateResponse";
import { Injectable } from "react.di";
import { MissionCreate } from "../../models/mission/create/MissionCreate";
import { RequesterService } from "../RequesterService";
import { MissionPublicResponse } from "../../models/response/mission/MissionPublicResponse";
import { HttpMethod } from "../utils";
import { MissionType } from "../../models/mission/Mission";
import { RequesterInfo} from "../../models/userInfo/RequesterInfo";
import { ImageInstanceDetail } from "../../models/instance/image/ImageInstanceDetail";
import { MissionInstanceState } from "../../models/instance/MissionInstanceState";
import { InstanceDetailResponse } from "../../models/response/mission/InstanceDetailResponse";
import { MissionFinalizeParameters, MissionFinalizeVo } from "../../models/instance/MissionFinalizeParameters";
import { InstanceResponse } from "../../models/response/mission/InstanceResponse";
import { RequesterCreditBoardResponse } from "../../models/leaderboard/RequesterCreditBoardResponse";
import { RequesterCreditSelfRankResponse } from "../../models/leaderboard/RequesterCreditSelfRankResponse";

@Injectable
export class RequesterServiceMock extends RequesterService {

  async createMission(createVo: MissionCreate, token: string): Promise<MissionCreateResponse> {
    // mock
    return {
      id: "123",
      token: "123"
    };

  }

  async uploadImageFile(missionId: string, formData: FormData, order: number, isCover: boolean, token: string): Promise<ImageUploadResponse> {

    // mock
    return {
      url: "123"
    };

  }

  async getAllMissionsBySelf(username: string): Promise<MissionPublicResponse> {
    return {
      pagingInfoVo: null,
      items: [1, 2, 3, 4, 5].map(x =>
        ({
          missionId: x+"",
          title: `Title${x}`,
          description: `Description `.repeat(x),
          topics: ["动物", "植物"],
          allowCustomTag: false,
          allowedTags: ["动物画", "植物画"],
          missionType: MissionType.IMAGE,
          start: new Date(),
          end: new Date(),
          coverUrl: "http://pic1.16xx8.com/allimg/170801/1-1FP116442T62.jpg",
          jobCount: 10,
          requesterUsername: "123"
        })
      )
    }
  };

  async getRequesterInfo(username: string, token: string): Promise<RequesterInfo> {
      return {
          username: "123",
          email: "1@1.com",
          submittedMissionCount: 10,
          instanceCount: 900,
          awaitingCommentInstanceCount: 300,
          inProgressInstanceCount: 300,
          finalizedInstanceCount: 300,
      } as RequesterInfo;
  };

  async getAllInstancesByMissionId(missionId: string, token: string): Promise<InstanceResponse> {
    return {
      instances: [1, 2, 3, 4, 5].map(x =>
        ({
          instanceId: x+"",
          workerUsername: "123",
          title: `${missionId}`,
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
      )
    };
  }


  async getInstanceDetail(instanceId: string, token: string): Promise<InstanceDetailResponse> {
    return {
      detail:
        {
          missionType: MissionType.IMAGE,
          imageResults: [],
          instance:
            {
              instanceId: "1",
              workerUsername: "123",
              title: `Title`,
              description: `Description `,
              missionId: "123",
              acceptDate: new Date(),
              submitDate: null,
              isSubmitted: false,
              completedJobsCount: 0,
              missionInstanceState: MissionInstanceState.IN_PROGRESS,
            }

        } as ImageInstanceDetail
    }
  }

  async finalize(instanceId: string, parameters: MissionFinalizeVo, token: string) : Promise<InstanceDetailResponse> {
    return {
      detail:
        {
          missionType: MissionType.IMAGE,
          imageResults: [],
          instance:
            {
              instanceId: instanceId,
              workerUsername: "123",
              title: `Title`,
              description: `Description `,
              missionId: "123",
              acceptDate: new Date(),
              submitDate: new Date(),
              isSubmitted: false,
              completedJobsCount: 0,
              missionInstanceState: MissionInstanceState.FINALIZED,
            }

        } as ImageInstanceDetail
    }

  }

  async getRequesterCreditBoard(pageSize: number, pageNumber: number, token: string): Promise<RequesterCreditBoardResponse> {
    return {
      pagingInfo:
        {
          totalCount: 8,
          currentPage:0,
          pageSize:5,
          totalPage:2,
        },
      creditBoardList:
        [ {username:"123",credits:999999,order:1},
          {username:"黄鹤你不是你不是你不是人",credits:518,order:2},
          {username:"123究竟是何方神仙",credits:489,order:3},
          {username:"1 2 3",credits:320,order:4},
          {username:"MadHannibal",credits:298,order:5},
          {username:"🍓イチゴ🍓だ好きでした",credits:200,order:6},
          {username:"沙雕图片艺术家",credits:198,order:7},
          {username:"燕小六六六的123",credits:197,order:8}
      ]
    }as RequesterCreditBoardResponse;
  }

  async getSpecificRequesterRank(username: string, token:string): Promise<RequesterCreditSelfRankResponse> {
    return {
      requesterCreditSelfRank:
        {
          username: "123",
          credits: 999999,
          order: 1,
        }

    } as RequesterCreditSelfRankResponse;
  }

}
