import { HttpService } from "./HttpService";
import { ImageMissionDetail } from "../models/mission/image/ImageMission";
import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";
import { MissionPublicItem } from "../models/mission/MissionPublicItem";
import { MissionDetail } from "../models/mission/MissionDetail";


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


}
