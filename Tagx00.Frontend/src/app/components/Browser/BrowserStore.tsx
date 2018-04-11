import { action, computed, observable, runInAction } from "mobx";
import { Tag } from "antd";
import { MissionPublicItem } from "../../models/mission/Mission";
import React from "react";
import { MissionService } from "../../api/MissionService";
import { Inject, Injectable } from "react.di";
import { Topic } from "../../models/topic/Topic";

interface ListDataProps {
  missionId: number,
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
  private static _maxLengthOfDescription = 100;
  @observable private _paused: boolean = true;
  @observable private _reverse: boolean = true;
  @observable private _listData: ListDataProps[] = [];
  @observable private _topics: Topic[] = [];
  @action public reverseBrowsing = () => {
    this._reverse = !this._reverse;
    this._paused = !this._paused;
  };

  constructor(@Inject private missionService: MissionService) {
    runInAction(async () => {
        this._topics = (await (missionService.getAllTopics())).topics
      }
    )
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
        this._listData.push(listProp);
      }
    })
  };

  @computed get isBrowsing(): boolean {
    return !this._paused;
  }

  @computed get reverse(): boolean {
    return this._reverse;
  }

  @computed get paused(): boolean {
    return this._paused;
  }

  @computed get listData(): ListDataProps[] {
    return this._listData;
  }

  @computed get topics(): Topic[] {
    return this._topics;
  }
}
