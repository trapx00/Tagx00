import { HttpService } from "./HttpService";
import { ImageMissionDetail } from "../models/mission/image/ImageMission";
import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";
import { MissionPublicItem } from "../models/mission/MissionPublicItem";
import { MissionDetail } from "../models/mission/MissionDetail";
import { ThreeDimensionModel } from "../models/mission/3d/3dModel";


@Injectable
export class MissionService {

  constructor(@Inject private http: HttpService) {
  }

  async getMissions(searchTarget: string): Promise<MissionPublicItem[]> {
    const res = await this.http.fetch({
      path: "/mission",
      method: HttpMethod.GET,
      queryParams: {searchTarget: searchTarget}
    });
    return res.response.items as MissionPublicItem[];

  }

  async getTextByToken(textToken: string): Promise<string> {
    const res = await this.http.fetch({
      path: `/mission/text`,
      queryParams: { token: textToken },
      method: HttpMethod.GET,
    });
    return res.response.text;
  }

  async getAMission(missionId: string): Promise<MissionDetail> {
    const res = await this.http.fetch({
      path: `/mission/${missionId}`,
    });

    if (res.ok) {
      return res.response.detail;
    } else {
      throw res.error;
    }
  }

  async getModelByToken(modelToken: string): Promise<ThreeDimensionModel> {
    const res = await this.http.fetch({
      path: `/mission/3dmodel`,
      queryParams: {token: modelToken},
      method: HttpMethod.GET
    });

    return res.response.model;
  }


  async segmentWord(token: string, missionId: string): Promise<string[]> {
    const res = await this.http.fetch({
      path: "/mission/worker/wordSegment",
      queryParams: { token: token, missionId: missionId}
    });

    if (res.ok) {
      return res.response.results;
    } else {
      throw res.error;
    }
  }

}
