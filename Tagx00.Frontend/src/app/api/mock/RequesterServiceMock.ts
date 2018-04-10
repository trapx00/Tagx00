import { ImageUploadResponse } from "../../models/mission/image/ImageUploadResponse";
import { MissionCreateResponse } from "../../models/mission/create/MissionCreateResponse";
import { Injectable } from "react.di";
import { MissionCreate } from "../../models/mission/create/MissionCreate";
import { RequesterService } from "../RequesterService";

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
}
