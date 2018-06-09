import { TextMissionDetail } from "../../../../models/mission/text/TextMissionDetail";
import { TextInstanceDetail } from "../../../../models/instance/text/TextInstanceDetail";
import { TextJob } from "../../../../models/instance/text/job/TextJob";
import { MissionType } from "../../../../models/mission/Mission";
import { TextMissionSetting, TextMissionType } from "../../../../models/mission/text/TextMissionProperties";
import { TextKeywordsJob } from "../../../../models/instance/text/job/TextKeywordsJob";
import { TextClassificationJob } from "../../../../models/instance/text/job/TextClassificationJob";
import { TextResult } from "../../../../models/instance/text/TextResult";
import { Notation, WorkPageController } from "../WorkPageController";
import { arrayContainsElement } from "../../../../../utils/Array";
import { TextNotation } from "./shared";




type KnownTextJob = TextKeywordsJob | TextClassificationJob;


export class TextWorkPageController extends WorkPageController<TextMissionDetail, TextInstanceDetail, TextJob, TextNotation<TextJob, TextMissionSetting>> {

  textTokens: string[] = [];

  settings: TextMissionSetting[];

  currentInstanceDetail(): TextInstanceDetail {
    const {instance} = this.initialDetail;
    return {
      missionType: MissionType.TEXT,
      textResults: this.currentNotations.map((x, index) => ({
        workResultId: index+"",
        textJob: x.job,
        url: x.textToken,
        isDone: this.judgeJobComplete(x.job as any)
      }) as TextResult),
      instance: instance
    }
  }

  judgeJobComplete(job: KnownTextJob) {
    if (!job) return false;
    switch (job.type) {
      case TextMissionType.CLASSIFICATION:
        return arrayContainsElement(job.tagTuples);
      case TextMissionType.KEYWORDS:
        return arrayContainsElement(job.tagTuples);
    }
    return false;
  }

  constructor(missionDetail: TextMissionDetail, instanceDetail: TextInstanceDetail) {
    super(missionDetail, instanceDetail);
    this.settings = missionDetail.settings;
    this.textTokens = missionDetail.tokens;

    // initialize jobs
    for (const url of missionDetail.tokens) {
      for (const setting of missionDetail.settings) {
        // find if the result is already exists
        const result = instanceDetail.textResults
          && instanceDetail.textResults.find(x => x.url == url && x.textJob.type == setting.textMissionType);

        if (!result){
          this.currentNotations.push({
            textToken: url,
            setting: setting,
            job: { type: setting.textMissionType }
          });
        } else {
          this.currentNotations.push({
            textToken: url,
            setting: setting,
            job: result.textJob
          });
        }
      }
    }

    this.toFirstNotComplete();
  }





}
