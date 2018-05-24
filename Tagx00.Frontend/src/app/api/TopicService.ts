import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";
import { TopicFetchResponse } from "../models/topic/response/TopicFetchResponse";
import { TopicDelete } from "../models/topic/TopicDelete";
import { TopicSave } from "../models/topic/TopicSave";
import { Response } from "../models/response/Response";

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

  async deleteTopics(topicDelete:TopicDelete): Promise<Response> {
    const res = await this.http.fetch({
      path: "mission/topics",
      method:HttpMethod.DELETE,
      body:topicDelete,
    });
    if (res.ok) {
      return res.response;
    } else {
      throw res.error;
    }

  }

  async addTopics(topicSave:TopicSave): Promise<Response> {
    const res = await this.http.fetch({
      path: "mission/topics",
      method:HttpMethod.PUT,
      body:topicSave,
    });
    if (res.ok) {
      return res.response;
    } else {
      throw res.error;
    }
  }
}
