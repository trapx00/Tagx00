import { HttpService } from "./HttpService";
import { MissionCreate } from "../models/mission/create/MissionCreate";
import { MissionCreateResponse } from "../models/mission/create/MissionCreateResponse";
import { HttpMethod } from "./utils";
import { ImageUploadResponse } from "../models/mission/image/ImageUploadResponse";
import { Inject, Injectable } from "react.di";
import { MissionPublicResponse } from "../models/response/mission/MissionPublicResponse";
import { RequesterInfo } from "../models/userInfo/RequesterInfo";
import { InstanceResponse } from "../models/response/mission/InstanceResponse";
import { MissionFinalizeVo } from "../models/instance/MissionFinalizeParameters";
import { InstanceDetailResponse } from "../models/response/mission/InstanceDetailResponse";
import { MissionRequestQueryResponse } from "../models/response/mission/MissionRequestQueryResponse";
import { MissionChargeResponse } from "../models/response/mission/MissionChargeResponse";

@Injectable
export class RequesterService {
  constructor(@Inject private http: HttpService) {
  }

  async createMission(createVo: MissionCreate): Promise<MissionCreateResponse> {
    const res = await this.http.fetch({
      path: "/mission",
      method: HttpMethod.POST,
      body: createVo,
      
    });

    return res.response;

  }

  async uploadImageFile(missionId: string, formData: FormData, order: number, isCover: boolean, token: string): Promise<ImageUploadResponse> {
    const res = await this.http.sendFile(
      formData,
      `/upload/mission/image/${missionId}`,
      token,
      {order, isCover},
    );
    console.log(res.response);
    return res.response;
  }

  async uploadTextZipFile(missionId: string, formData: FormData, token: string) : Promise<void> {
    const res = await this.http.sendFile(
      formData,
      `/upload/mission/text/${missionId}`,
      token
    );

  }

  async getAllMissionsBySelf(username: string): Promise<MissionPublicResponse> {
    const res = await this.http.fetch({
      method: HttpMethod.GET,
      path: "/mission",
      queryParams: {requester: username},
    });

    return res.response;
  }

  async getRequesterInfo(username: string): Promise<RequesterInfo> {
    const res = await this.http.fetch({
      path: `/account/requester/${username}`
    });

    return res.response.info;
  }

  async finalize(instanceId: string, parameters: MissionFinalizeVo): Promise<InstanceDetailResponse> {
    const res = await this.http.fetch({
      path: `/mission/requester/instances/${instanceId}`,
      method: HttpMethod.POST,
      body: parameters,
    });

    return res.response;
  }

  async payMission(missionId: string, credits: number): Promise<MissionChargeResponse> {
    const res = await this.http.fetch({
      path: `/mission/requester/mission/${missionId}`,
      method: HttpMethod.PATCH,
      queryParams: { credits },
    });
    return res.response;
  }


  async getAllInstancesByMissionId(missionId: string): Promise<InstanceResponse> {
    const res = await this.http.fetch({
      method: HttpMethod.GET,
      path: `/mission/requester/instances/`,
      queryParams: missionId ? {missionId} : {},
    });
    return res.response;
  }

  async getInstanceDetail(instanceId: string): Promise<InstanceDetailResponse> {
    const res = await this.http.fetch({
      path: `/mission/requester/instances/${instanceId}`,
    });

    return res.response;
  }

  async getRemainingCreditsForAMission(missionId: string): Promise<MissionRequestQueryResponse> {
    const res = await this.http.fetch({
      path: `/mission/requester/mission/${missionId}`,
    });

    if (res.ok) {
      return res.response;
    } else {
      throw res.error;
    }

  }


}
