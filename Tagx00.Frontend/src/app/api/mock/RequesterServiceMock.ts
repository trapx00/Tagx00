import { ImageUploadResponse } from "../../models/mission/image/ImageUploadResponse";
import { MissionCreateResponse } from "../../models/mission/create/MissionCreateResponse";
import { Injectable } from "react.di";
import { MissionCreate } from "../../models/mission/create/MissionCreate";
import { RequesterService } from "../RequesterService";
import { MissionPublicResponse } from "../../models/response/mission/MissionPublicResponse";
import { MissionType } from "../../models/mission/Mission";
import { InstanceResponse } from "../../models/response/mission/InstanceResponse";
import { MissionInstanceState } from "../../models/instance/MissionInstanceState";

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
          missionId: x,
          title: `Title${x}`,
          description: `Description `.repeat(x),
          topics: ["动物", "植物"],
          allowCustomTag: false,
          allowedTags: ["动物画", "植物画"],
          missionType: MissionType.IMAGE,
          start: new Date(),
          end: new Date(),
          coverUrl: "http://pic1.16xx8.com/allimg/170801/1-1FP116442T62.jpg",
        })
      )
    }
  }

  async getAllInstancesByMissionId(missionId: number | string, token: string) : Promise<InstanceResponse> {
    return {
      instances: [1, 2, 3, 4, 5].map(x =>
        ({
          instanceId: x,
          workerUsername: "123",
          title: `${missionId}`,
          description: `Description `.repeat(x),
          missionId: 123,
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
}
