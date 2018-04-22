import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";
import { TopicFetchResponse } from "../models/topic/response/TopicFetchResponse";
import { TopicDelete } from "../models/topic/TopicDelete";
import { TopicSave } from "../models/topic/TopicSave";

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

  async deleteTopics(topicDelete:TopicDelete, token: string): Promise<Response> {
    const res = await this.http.fetch({
      path: "mission/topics",
      method:HttpMethod.DELETE,
      body:topicDelete,
      token:token
    });
    return res.response;
  }

  async addTopics(topicSave:TopicSave, token: string): Promise<Response> {
    const res = await this.http.fetch({
      path: "mission/topics",
      method:HttpMethod.PUT,
      body:topicSave,
      token:token
    });
    return res.response;
  }
}
