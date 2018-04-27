import { action, computed, observable, runInAction } from "mobx";
import { MissionPublicItem } from "../models/mission/Mission";
import React from "react";
import { MissionService } from "../api/MissionService";
import { Inject, Injectable } from "react.di";
import { Topic } from "../models/topic/Topic";
import { TopicService } from "../api/TopicService";


@Injectable
export class BrowserStore {

  @observable moveHeight: number = -document.body.clientHeight * 0.3;
  @observable paused: boolean = true;
  @observable reverse: boolean = true;
  @observable listData: MissionPublicItem[] = [];
  @observable topics: Topic[] = [];
  @observable isStop: boolean = false;


  constructor(@Inject private topicService: TopicService, @Inject private missionService: MissionService) {
  }

  @action public startBrowsing = () => {
    this.reverse = false;
    this.paused = false;
    setTimeout(() => runInAction(() => this.isStop = true), 450);
  };

  async fetchAllTopics() {
    const topics = await this.topicService.getAllTopics();
    runInAction(() => {
      this.topics = topics.topics;
    })
  }

  @computed get isBrowsing(): boolean {
    return !this.paused;
  }

  @action public search = async (props) => {
    const items = await this.missionService.getMissions(props);
    runInAction(() => {
      this.listData = items
    });
  };
}
