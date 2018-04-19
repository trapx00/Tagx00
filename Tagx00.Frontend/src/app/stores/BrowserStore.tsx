import { action, computed, observable, runInAction } from "mobx";
import { Tag } from "antd";
import { MissionPublicItem } from "../models/mission/Mission";
import React from "react";
import { MissionService } from "../api/MissionService";
import { Inject, Injectable } from "react.di";
import { Topic } from "../models/topic/Topic";
import { TopicService } from "../api/TopicService";



@Injectable
export class BrowserStore {
  private static _standardHeight: number = 833;
  private static _standardWidth: number = 1200;
  private static _maxLengthOfDescription: number = 100;

  @observable searchBarWidth: number = -document.body.clientWidth * 3 / 4;
  @observable moveHeightRate: number = document.body.clientHeight / BrowserStore._standardHeight;
  @observable moveWidthRate: number = document.body.clientWidth / BrowserStore._standardWidth;
  @observable paused: boolean = true;
  @observable reverse: boolean = true;
  @observable listData: MissionPublicItem[] = [];
  @observable topics: Topic[] = [];
  @observable isStop: boolean = false;


  constructor(@Inject private topicService: TopicService, @Inject private missionService: MissionService) {}

  @action public startBrowsing = () => {
    this.reverse = false;
    this.paused = false;
    setTimeout(() => runInAction(() => this.isStop = true), 1200);
  };

  @action public resizeMoveRate = () => {
    this.moveHeightRate = document.body.clientHeight / BrowserStore._standardHeight;
    this.moveWidthRate = document.body.clientWidth / BrowserStore._standardWidth;
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

  @action public search = async (info) => {
    const items = await this.missionService.getAllMissions();
    runInAction(() => {
      this.listData = items
    });
  };
}
