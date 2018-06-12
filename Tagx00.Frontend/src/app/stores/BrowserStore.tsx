import { action, computed, observable, runInAction } from "mobx";
import React from "react";
import { MissionService } from "../api/MissionService";
import { Inject, Injectable } from "react.di";
import { Topic } from "../models/topic/Topic";
import { TopicService } from "../api/TopicService";
import { waitForMs } from "../../utils/Wait";
import { MissionPublicItem } from "../models/mission/MissionPublicItem";


@Injectable
export class BrowserStore {

  @observable listData: MissionPublicItem[] = [];
  @observable topics: Topic[] = [];
  @observable loading: boolean = false;


  constructor(@Inject private topicService: TopicService, @Inject private missionService: MissionService) {
  }

  async fetchAllTopics() {
    const topics = await this.topicService.getAllTopics();
    runInAction(() => {
      this.topics = topics.topics;
    })
  }

  @action public search = async (search: string) => {
    this.loading = true;
    const items = await this.missionService.getMissions(search);
    runInAction(() => {
      this.listData = items;
      this.loading = false;
    });
  };
}
