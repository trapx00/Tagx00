import { HttpService } from "./HttpService";
import { MissionCreate } from "../models/mission/create/MissionCreate";
import { MissionCreateResponse } from "../models/mission/create/MissionCreateResponse";
import { HttpMethod } from "./utils";
import { ImageUploadResponse } from "../models/mission/image/ImageUploadResponse";
import { Inject, Injectable } from "react.di";

@Injectable
export class RequesterService {
  constructor(@Inject private http: HttpService) {
  }

  async createMission(createVo: MissionCreate, token: string): Promise<MissionCreateResponse> {
    const res = await this.http.fetch({
      path: "/mission",
      method: HttpMethod.POST,
      body: createVo,
      token: token
    });

    return res.response;

  }

  async uploadImageFile(missionId: string, formData: FormData, order: number, isCover: boolean, token: string): Promise<ImageUploadResponse> {
    const res = await this.http.sendFile(
      formData,
      `/upload/mission/image/${missionId}`,
      {order, isCover},
      {"Authorization": "Bearer " + token}
    );

    return res.response;
  }
}
