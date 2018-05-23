import { HttpService } from "./HttpService";
import { Instance } from "../models/instance/Instance";
import { InstanceDetail } from "../models/instance/InstanceDetail";
import { HttpMethod } from "./utils";
import { Response } from "../models/response/Response";
import { Inject, Injectable } from "react.di";
import { WorkerInfo } from "../models/userInfo/WorkerInfo";
import { InstanceDetailResponse } from "../models/response/mission/InstanceDetailResponse";
import { MissionType } from "../models/mission/Mission";

@Injectable
export class WorkerService {

  constructor(@Inject private http: HttpService) {
  }

  async getAllInstances(): Promise<Instance[]> {

    const res = await this.http.fetch({
      path: "/mission/worker"
    });
    return res.response.instances as Instance[];

  }

  async getInstanceDetail(missionId: string): Promise<InstanceDetailResponse> {


    const res = await this.http.fetch({
      path: `/mission/worker/${missionId}`,
    });
    if (res.ok) {
      return res.response as InstanceDetailResponse;
    } else {
      throw res.error;
    }

  }

  async saveProgress(missionId: string, detail: InstanceDetail): Promise<boolean> {
    const res = await this.http.fetch({
      path: `/mission/worker/${missionId}`,
      body: detail,
      method: HttpMethod.PUT
    });

    return res.ok;
  }

  async submit(missionId: string, detail: InstanceDetail): Promise<boolean> {
    const res = await this.http.fetch({
      path: `/mission/worker/${missionId}`,
      method: HttpMethod.POST,
      body: detail
    });

    return res.ok;
  }

  async acceptMission(missionId: string): Promise<Response> {
    const res = await this.http.fetch({
      path: `/mission/worker/${missionId}`,
      body: {instance: null, missionType: MissionType.IMAGE},
      method: HttpMethod.POST
    });

    return res.response;

  }

  async getWorkerInfo(username: string): Promise<WorkerInfo> {
    const res = await this.http.fetch({
      path: `/account/worker/${username}`,
    });
    return res.response.info as WorkerInfo;
  }

  async abandonMission(missionId: string): Promise<Response> {
    const res = await this.http.fetch({
      path: `mission/worker/${missionId}`,
      method: HttpMethod.DELETE
    });

    return res.response;
  }


}
