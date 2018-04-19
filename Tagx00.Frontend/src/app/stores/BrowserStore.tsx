import { action, computed, observable, runInAction } from "mobx";
import { Tag } from "antd";
import { MissionPublicItem } from "../models/mission/Mission";
import React from "react";
import { MissionService } from "../api/MissionService";
import { Inject, Injectable } from "react.di";
import { Topic } from "../models/topic/Topic";

interface ListDataProps {
  missionId: string,
  coverUrl: string,
  title: string,
  tags: any,
  startDate: string,
  description: string
}

const smallerDiv = {
  display: 'inline',
};

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
  @observable listData: ListDataProps[] = [];
  @observable topics: Topic[] = [];
  @observable isStop: boolean = false;
  @action public reverseBrowsing = () => {
    this.reverse = !this.reverse;
    this.paused = !this.paused;
    setTimeout(() => runInAction(() => this.isStop = true),1200);
  };

  @action public resizeMoveRate = () => {
    this.moveHeightRate = document.body.clientHeight / BrowserStore._standardHeight;
    this.moveWidthRate = document.body.clientWidth / BrowserStore._standardWidth;
  };

  constructor(@Inject private missionService: MissionService) {
    this.fetchAllTopics();
  }

  async fetchAllTopics() {
    const topics = await this.missionService.getAllTopics();
    runInAction(() => {
      this.topics = topics.topics;
    })
  }

  @computed get isBrowsing(): boolean {
    return !this.paused;
  }

  @action public search = async (info) => {
    let missions: MissionPublicItem[] = (await this.missionService.getAllMissions());
    runInAction(() => {
      for (let i = 0; i < missions.length; i++) {
        let tagText = [];
        tagText.push({"text": missions[i].missionType, "isTypeTag": true});
        missions[i].topics.map((item) => {
          tagText.push(item);
        });
        let listProp: ListDataProps = {
          missionId: missions[i].missionId,
          coverUrl: missions[i].coverUrl,
          title: missions[i].title,
          tags: null,
          startDate: "",
          description: ""
        };
        listProp.tags = (
          <div>
            {tagText.map(
              (item) => {
                if (item.isTypeTag) {
                  return <Tag color="#108ee9" style={smallerDiv}>{item.text.toString()}</Tag>
                }
                else {
                  return <Tag color="geekblue" style={smallerDiv}>{item}</Tag>
                }
              }
            )}
          </div>
        );
        listProp.startDate = new Date(missions[i].start).toDateString();
        listProp.description = missions[i].description.length > BrowserStore._maxLengthOfDescription ? missions[i].description.substring(0, BrowserStore._maxLengthOfDescription) + "……" : missions[i].description;
        this.listData.push(listProp);
      }
    })
  };
}
