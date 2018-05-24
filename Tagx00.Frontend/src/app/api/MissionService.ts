import { HttpService } from "./HttpService";
import { MissionPublicItem } from "../models/mission/Mission";
import { ImageMissionDetail } from "../models/mission/image/ImageMission";
import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";


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

  async getAMission(missionId: string): Promise<ImageMissionDetail> {
    const res = await this.http.fetch({
      path: `/mission/${missionId}`,
    });

    if (res.ok) {
      return res.response.detail;
    } else {
      throw res.error;
    }
  }


}
