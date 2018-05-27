import { ImageUploadResponse } from "../../models/mission/image/ImageUploadResponse";
import { MissionCreateResponse } from "../../models/mission/create/MissionCreateResponse";
import { Injectable } from "react.di";
import { MissionCreate } from "../../models/mission/create/MissionCreate";
import { RequesterService } from "../RequesterService";
import { MissionPublicResponse } from "../../models/response/mission/MissionPublicResponse";
import { MissionType } from "../../models/mission/Mission";
import { RequesterInfo } from "../../models/userInfo/RequesterInfo";
import { ImageInstanceDetail } from "../../models/instance/image/ImageInstanceDetail";
import { MissionInstanceState } from "../../models/instance/MissionInstanceState";
import { InstanceDetailResponse } from "../../models/response/mission/InstanceDetailResponse";
import { MissionFinalizeVo } from "../../models/instance/MissionFinalizeParameters";
import { InstanceResponse } from "../../models/response/mission/InstanceResponse";
import { MissionRequestQueryResponse } from "../../models/response/mission/MissionRequestQueryResponse";
import { MissionChargeResponse } from "../../models/response/mission/MissionChargeResponse";

@Injectable
export class RequesterServiceMock extends RequesterService {

  async createMission(createVo: MissionCreate): Promise<MissionCreateResponse> {
    // mock
    return {
      id: "123",
      token: "123"
    };

  }

  async uploadImageFile(missionId: string, formData: FormData, order: number, isCover: boolean): Promise<ImageUploadResponse> {

    // mock
    return {
      url: "123"
    };

  }

  async uploadTextZipFile(missionId: string, formData: FormData, token: string) : Promise<void> {


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
          requesterUsername: "123",
          level: 1,
          minimalWorkerLevel: 1,
          credits: 100
        })
      )
    }
  };

  async getRequesterInfo(username: string): Promise<RequesterInfo> {
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

  async getAllInstancesByMissionId(missionId: string): Promise<InstanceResponse> {
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

  async payMission(missionId: string, credits: number): Promise<MissionChargeResponse> {
    return {
      remainingCredits: 10
    }
  }


  async getInstanceDetail(instanceId: string): Promise<InstanceDetailResponse> {
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

  async finalize(instanceId: string, parameters: MissionFinalizeVo) : Promise<InstanceDetailResponse> {
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

  async getRemainingCreditsForAMission(missionId: string): Promise<MissionRequestQueryResponse> {
    // await waitForMs(1000);
    // if (Math.random() < 0.5) {
    //   throw {};
    // }
    return {
      remainingCredits: parseInt(missionId) || Math.random()*10
    }
  }



}
