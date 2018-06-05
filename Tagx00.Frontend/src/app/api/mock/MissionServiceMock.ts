import { MissionService } from "../MissionService";
import { ImageMissionDetail, ImageMissionType } from "../../models/mission/image/ImageMission";
import { MissionState, MissionType } from "../../models/mission/Mission";
import { Injectable } from "react.di";
import { MissionPublicItem } from "../../models/mission/MissionPublicItem";
import { MissionDetail } from "../../models/mission/MissionDetail";
import { TextMissionDetail } from "../../models/mission/text/TextMissionDetail";
import {
  TextMissionClassificationSetting,
  TextMissionKeywordsSetting,
  TextMissionType
} from "../../models/mission/text/TextMissionProperties";
import { HttpMethod } from "../utils";

export const imgs = [
  "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0E/00/ChMkJlnJ4TOIAyeVAJqtjV-XTiAAAgzDAE7v40Amq2l708.jpg",
  "http://b1-q.mafengwo.net/s8/M00/02/BF/wKgBpVWnJL6AfCcFAA_oZSqEvVE56.jpeg?imageMogr2%2Fthumbnail%2F%21690x370r%2Fgravity%2FCenter%2Fcrop%2F%21690x370%2Fquality%2F100",
  "http://pic1.16xx8.com/allimg/170801/1-1FP116442T62.jpg",
  "http://p4-q.mafengwo.net/s7/M00/BD/0E/wKgB6lSwiyyAMQDHAA_6txvdndY07.jpeg?imageMogr2%2Fthumbnail%2F%21690x370r%2Fgravity%2FCenter%2Fcrop%2F%21690x370%2Fquality%2F100"
];

const texts = [
  // "https://raw.githubusercontent.com/viccrubs/VicBlog-Backend/master/VicBlogServer/Data/DefaultCrudDataController.cs"
  // "https://viccrubs.tk"
// "http://vicblogapi.azurewebsites.net/api/Articles",
  "http://tagx00.oos-bj2.ctyunapi.cn/text_text-18_0?AWSAccessKeyId=c4582dec5d0809103126&Expires=9223372036854775&Signature=up6rePJY2fc92TzErMw5jbwTfmM%3D"
];


@Injectable
export class MissionServiceMock extends MissionService {

  async getAMission(missionId: string): Promise<MissionDetail> {


    // return {
    //   publicItem: {
    //     missionId: missionId,
    //     title: "Mission " + missionId,
    //     description: "Description " + missionId,
    //     topics: ["scenes"],
    //     missionType: MissionType.TEXT,
    //     start: new Date(),
    //     end: new Date(),
    //     coverUrl: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g3/M0A/0F/09/Cg-4WFRplp2IYqiNACQ0TQPPChQAARbPQEM84oAJDRl464.jpg",
    //     jobCount: 10,
    //     requesterUsername: "123",
    //     minimalWorkerLevel: 2,
    //     level: 1,
    //     credits: 100,
    //     missionTypes: [ TextMissionType.KEYWORDS, TextMissionType.CLASSIFICATION ]
    //   },
    //   missionState: MissionState.ACTIVE,
    //   settings: [
    //     {
    //     textMissionType: TextMissionType.KEYWORDS,
    //     keywords: ["1","2"]
    //   } as TextMissionKeywordsSetting,
    //     {
    //       textMissionType: TextMissionType.CLASSIFICATION,
    //       classes: ["1","2","3"]
    //     } as TextMissionClassificationSetting,
    //   ],
    //   tokens: texts
    // } as TextMissionDetail;

    return {
      publicItem: {
        missionId: missionId,
        title: "Mission " + missionId,
        description: "Description " + missionId,
        topics: ["scenes"],
        allowCustomTag: false,
        missionType: MissionType.IMAGE,
        imageMissionTypes: [
          ImageMissionType.DISTRICT,
          // ImageMissionType.PART,
          // ImageMissionType.WHOLE
        ],
        start: new Date(),
        end: new Date(),
        coverUrl: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g3/M0A/0F/09/Cg-4WFRplp2IYqiNACQ0TQPPChQAARbPQEM84oAJDRl464.jpg",
        jobCount: 10,
        requesterUsername: "123",
        minimalWorkerLevel: 2,
        level: 1,
        credits: 100
      },
      missionState: MissionState.ACTIVE,
      missionAssets: imgs.map(x => ({url: x, tagConfTuple:
          [
            {tag: "1", confidence: 1},
            {tag: "2", confidence: 0.4},
            {tag: "3", confidence: 0.8}
        ]}))
    } as ImageMissionDetail;


  }

  async getTextByToken(textToken: string): Promise<string> {
    return "hahahahahahahahaha";
  }


  async getMissions(): Promise<MissionPublicItem[]> {

    //mock
    return [1, 2, 3, 4, 5].map(x =>
      ({
        missionId: x + "",
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
        requesterUsername: "123",
        minimalWorkerLevel: 1,
        level: 1,
        credits: 100
      })
    );

  }

}
