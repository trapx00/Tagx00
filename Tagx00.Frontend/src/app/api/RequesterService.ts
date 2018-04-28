import { HttpService } from "./HttpService";
import { MissionCreate } from "../models/mission/create/MissionCreate";
import { MissionCreateResponse } from "../models/mission/create/MissionCreateResponse";
import { HttpMethod } from "./utils";
import { ImageUploadResponse } from "../models/mission/image/ImageUploadResponse";
import { Inject, Injectable } from "react.di";
import { MissionPublicResponse } from "../models/response/mission/MissionPublicResponse";
import { RequesterInfo } from "../models/userInfo/RequesterInfo";
import { InstanceResponse } from "../models/response/mission/InstanceResponse";
import { MissionFinalizeParameters, MissionFinalizeVo } from "../models/instance/MissionFinalizeParameters";
import { InstanceDetailResponse } from "../models/response/mission/InstanceDetailResponse";
import { RequesterCreditBoardResponse } from "../models/leaderboard/RequesterCreditBoardResponse";
import { RequesterCreditSelfRankResponse } from "../models/leaderboard/RequesterCreditSelfRankResponse";
import { MissionRequestQueryResponse } from "../models/response/mission/MissionRequestQueryResponse";
import { MissionChargeResponse } from "../models/response/mission/MissionChargeResponse";

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

  async getAllMissionsBySelf(username: string): Promise<MissionPublicResponse> {
    const res = await this.http.fetch({
      method: HttpMethod.GET,
      path: "/mission",
      queryParams: {requester: username},
    });

    return res.response;
  }

  async getRequesterInfo(username: string, token: string): Promise<RequesterInfo> {
    const res = await this.http.fetch({
      path: `/account/requester/${username}`,
      token: token,
    });

    return res.response.info;
  }

  async finalize(instanceId: string, parameters: MissionFinalizeVo, token: string): Promise<InstanceDetailResponse> {
    const res = await this.http.fetch({
      path: `/mission/requester/instances/${instanceId}`,
      method: HttpMethod.POST,
      body: parameters,
      token
    });

    return res.response;
  }

  async payMission(missionId: string, credits: number, token: string): Promise<MissionChargeResponse> {
    const res = await this.http.fetch({
      path: `/mission/requester/mission/${missionId}`,
      method: HttpMethod.PATCH,
      queryParams: { credits },
      token
    });
    return res.response;
  }


  async getAllInstancesByMissionId(missionId: string, token: string): Promise<InstanceResponse> {
    const res = await this.http.fetch({
      method: HttpMethod.GET,
      path: `/mission/requester/instances/`,
      queryParams: missionId ? {missionId} : {},
      token
    });
    return res.response;
  }

  async getInstanceDetail(instanceId: string, token: string): Promise<InstanceDetailResponse> {
    const res = await this.http.fetch({
      path: `/mission/requester/instances/${instanceId}`,
      token
    });

    return res.response;
  }

  async getRemainingCreditsForAMission(missionId: string, token: string): Promise<MissionRequestQueryResponse> {
    const res = await this.http.fetch({
      path: `/mission/requester/mission/${missionId}`,
      token
    });

    if (res.ok) {
      return res.response;
    } else {
      throw res.error;
    }

  }


}
