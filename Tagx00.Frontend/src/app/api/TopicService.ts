import { runInAction } from "mobx";
import { TopicFetchResponse } from "./MissionService";
import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";

@Injectable
export class TopicService {

  constructor(@Inject private http: HttpService) { }

  async getAllTopics(): Promise<TopicFetchResponse> {
    const res = await this.http.fetch({
      path: "/mission/topics",
      method: HttpMethod.GET
    });
    return res.response;
  }


}
