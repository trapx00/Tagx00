import { MissionService, TopicFetchResponse } from "../MissionService";
import { ImageMissionDetail, ImageMissionType } from "../../models/mission/image/ImageMission";
import { MissionPublicItem, MissionState, MissionType } from "../../models/mission/Mission";
import { Injectable } from "react.di";
import { HttpMethod } from "../utils";

export const imgs = [
  "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0E/00/ChMkJlnJ4TOIAyeVAJqtjV-XTiAAAgzDAE7v40Amq2l708.jpg",
  "http://b1-q.mafengwo.net/s8/M00/02/BF/wKgBpVWnJL6AfCcFAA_oZSqEvVE56.jpeg?imageMogr2%2Fthumbnail%2F%21690x370r%2Fgravity%2FCenter%2Fcrop%2F%21690x370%2Fquality%2F100",
  "http://pic1.16xx8.com/allimg/170801/1-1FP116442T62.jpg",
  "http://p4-q.mafengwo.net/s7/M00/BD/0E/wKgB6lSwiyyAMQDHAA_6txvdndY07.jpeg?imageMogr2%2Fthumbnail%2F%21690x370r%2Fgravity%2FCenter%2Fcrop%2F%21690x370%2Fquality%2F100"
];



@Injectable
export class MissionServiceMock extends MissionService {

  async getAMission(missionId: string, token: string): Promise<ImageMissionDetail> {

    return  {
      publicItem: {
        missionId: missionId,
        title: "Mission " + missionId,
        description: "Description "+missionId,
        topics: ["scenes"],
        allowCustomTag: false,
        allowedTags: ["tag1", "tag2"],
        missionType: MissionType.IMAGE,
        start: new Date(),
        end: new Date(),
        coverUrl: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g3/M0A/0F/09/Cg-4WFRplp2IYqiNACQ0TQPPChQAARbPQEM84oAJDRl464.jpg",
        jobCount: 10,
        requesterUsername: "123"
      },
      missionState: MissionState.ACTIVE,
      imageUrls: imgs,
      imageMissionTypes: [
        ImageMissionType.DISTRICT,
        // ImageMissionType.PART,
        // ImageMissionType.WHOLE
      ]
    } as ImageMissionDetail;


  }


  async getAllMissions(): Promise<MissionPublicItem[]> {

    //mock
    return [1, 2, 3, 4, 5].map(x =>
      ({
        missionId: x+"",
        title: `Title${x}`,
        description: `Description `.repeat(x),
        topics: ["动物", "植物"],
        allowCustomTag: false,
        allowedTags: ["动物画", "植物画"],
        missionType: MissionType.IMAGE,
        start: new Date(),
        end: new Date(),
        coverUrl: "http://pic1.16xx8.com/allimg/170801/1-1FP116442T62.jpg",
        jobCount: 10,
        requesterUsername: "123"
      })
    );

  }

}
