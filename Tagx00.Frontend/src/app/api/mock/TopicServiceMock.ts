import { TopicService } from "../TopicService";
import { TopicFetchResponse } from "../MissionService";
import { Injectable } from "react.di";

@Injectable
export class TopicServiceMock extends TopicService {


  async getAllTopics(): Promise<TopicFetchResponse> {
    return {
      topics: [
        {
          topicId: 1,
          value: "123"
        }
      ]
    }
  }
}
