import { BaseService, NetworkResponse } from "./BaseService";
import { Instance } from "../models/instance/Instance";
import { ImageMissionDetail, ImageMissionType } from "../models/mission/ImageMission";
import { MissionInstanceState } from "../models/instance/MissionInstanceState";
import { MissionPublicItem, MissionState, MissionType } from "../models/mission/Mission";
import { waitForMs } from "../../utils/Wait";
import { InstanceDetail } from "../models/instance/InstanceDetail";
import { imgs } from "./MissionService";
import { ImageInstanceDetail } from "../models/instance/image/ImageInstanceDetail";
import { HttpMethod } from "./utils";
import { Response } from "../models/Response";
import { userInfo } from "os";

export class BrowseService extends BaseService {

  constructor() {
    super("mission");
  }

  async getAllMissions(): Promise<MissionPublicItem[]> {
    //mock
    const res = await this.fetch({
      route: "",
      method: HttpMethod.GET
    });
    return res.response.items as MissionPublicItem[];
    // return [1, 2, 3, 4, 5].map(x =>
    //   ({
    //     missionId: x,
    //     title: `Title${x}`,
    //     description: `Description `.repeat(x),
    //     topics: ["动物", "植物"],
    //     allowCustomTag: false,
    //     allowedTags: ["动物画", "植物画"],
    //     missionType: MissionType.IMAGE,
    //     start: new Date(),
    //     end: new Date(),
    //     coverUrl: "http://pic1.16xx8.com/allimg/170801/1-1FP116442T62.jpg",
    //   })
    // );

    // const res = await this.fetch({
    //   token: this.token
    // });
    //
    // return res.response.instances as Instance[];

  }



}

export const browseService = new BrowseService();
