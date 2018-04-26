import { TopicService } from "../TopicService";
import { Injectable } from "react.di";
import { Response } from "../../models/response/Response";
import { TopicDelete } from "../../models/topic/TopicDelete";
import { TopicSave } from "../../models/topic/TopicSave";
import { TopicFetchResponse } from "../../models/topic/response/TopicFetchResponse";

@Injectable
export class TopicServiceMock extends TopicService {


  async getAllTopics(): Promise<TopicFetchResponse> {
    return {
      topics: [
        {topicId: 1, value: "123"},
        {topicId: 2, value: "动物"},
        {topicId: 3, value: "植物"},
        {topicId: 4, value: "眼睛"},
        {topicId: 5, value: "鼻子"}
      ]
    }
  }

  async deleteTopics(topicDelete:TopicDelete, token: string): Promise<Response> {
    return {
      infoCode: 10000,
      description: "success"
    };
  }

  async addTopics(topicSave:TopicSave, token: string): Promise<Response> {
    return {
      infoCode: 10000,
      description: "success"
    };
  }
}
