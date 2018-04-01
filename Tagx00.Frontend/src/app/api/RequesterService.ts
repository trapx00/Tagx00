import { BaseService } from "./BaseService";
import { MissionCreate } from "../models/mission/create/MissionCreate";
import { MissionCreateResponse } from "../models/mission/create/MissionCreateResponse";
import { HttpMethod } from "./utils";
import { ImageUploadResponse } from "../models/mission/image/ImageUploadResponse";

export class RequesterService extends BaseService {
  constructor() {
    super("")
  }

  async createMission(createVo: MissionCreate, token: string): Promise<MissionCreateResponse> {
    // mock
    // return {
    //   id: "123",
    //   token: "123"
    // };


    const res = await this.fetch({
      route: "/mission",
      method: HttpMethod.POST,
      body: createVo,
      token: token
    });

    return res.response;

  }

  async uploadImageFile(missionId: string, formData: FormData, order: number, isCover: boolean, token: string): Promise<ImageUploadResponse> {

    // mock
    // return {
    //   url: "123"
    // };

    const res = await this.sendFile(
      formData,
      `/upload/mission/image/${missionId}`,
      {order, isCover},
      {"Authorization": "Bearer " + token}
    );

    return res.response;
  }
}

export const requesterService = new RequesterService();
