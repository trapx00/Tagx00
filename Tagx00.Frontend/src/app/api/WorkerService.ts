import { BaseService } from "./BaseService";
import {
  MissionRequesterQueryDetailItem,
  MissionRequesterQueryItem
} from "../models/mission/image/MissionRequesterQueryItem";

export class WorkerService extends BaseService {

  private token: string;

  constructor(token: string) {
    super("mission/worker");
    this.token = token;
  }

  async getAllMissions() {
    const res = await this.fetch({
      token: this.token
    });

    return res.response.items as MissionRequesterQueryItem[];

  }

  async getAMission(missionId: number) {
    const res = await this.fetch({
      token: this.token,
      route: missionId+"",
    });

    return res.response.detail as MissionRequesterQueryDetailItem;
  }


}
