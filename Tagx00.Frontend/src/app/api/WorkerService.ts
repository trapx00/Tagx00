import { HttpService } from "./HttpService";
import { Instance } from "../models/instance/Instance";
import { InstanceDetail } from "../models/instance/InstanceDetail";
import { ImageInstanceDetail } from "../models/instance/image/ImageInstanceDetail";
import { HttpMethod } from "./utils";
import { Response } from "../models/Response";
import { Inject, Injectable } from "react.di";

@Injectable
export class WorkerService {

  constructor(@Inject private http: HttpService) {
  }

  async getAllInstances(token: string): Promise<Instance[]> {

    const res = await this.http.fetch({
      token: token,
      path: "/mission/worker"
    });
    return res.response.instances as Instance[];

  }

  async getInstanceDetail(missionId: number | string, token: string): Promise<ImageInstanceDetail> {


    const res = await this.http.fetch({
      token: token,
      path: `/mission/worker/${missionId}`,
    });
    return res.response.detail as ImageInstanceDetail;
  }

  async saveProgress(missionId: number, detail: InstanceDetail, token: string): Promise<boolean> {
    const res = await this.http.fetch({
      token: token,
      path: `/mission/worker/${missionId}`,
      body: detail,
      method: HttpMethod.PUT
    });

    return res.ok;
  }

  async submit(missionId: number, detail: InstanceDetail, token: string): Promise<boolean> {
    const res = await this.http.fetch({
      token: token,
      path: `/mission/worker/${missionId}`,
      method: HttpMethod.POST,
      body: detail
    });

    return res.ok;
  }

  async acceptMission(missionId: number, token: string): Promise<Response> {
    const res = await this.http.fetch({
      path: `/mission/worker/${missionId}`,
      body: {instance: null},
      token,
      method: HttpMethod.POST
    });

    return res.response;
    
  }
}
