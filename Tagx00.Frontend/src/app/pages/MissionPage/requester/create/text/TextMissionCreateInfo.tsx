import { MissionCreateInfo } from "../MissionCreateInfo";
import { computed, observable } from "mobx";
import { UploadFile } from "antd/es/upload/interface";
import { MissionType } from "../../../../../models/mission/Mission";
import {
  TextMissionKeywordsSetting,
  TextMissionProperties,
  TextMissionType
} from "../../../../../models/mission/text/TextMissionProperties";

export class TextMissionCreateInfo extends MissionCreateInfo {

  @observable enableClassification = false;
  @observable classes: string[] = [];
  @observable enableKeywords = false;
  @observable keywords: string[] = [];
  @observable zip: UploadFile;

  @computed get classificationValid() {
    return !this.createAttempted || !this.enableClassification || this.classes.length > 0;
  }

  @computed get taskValid() {
    return !this.createAttempted || this.enableClassification || this.enableKeywords;
  }

  @computed get zipValid() {
    return !this.createAttempted || !!this.zip;
  }

  missionCreateVo() {
    return {
      ...super.missionCreateVo(),
      properties: {
        type: MissionType.TEXT,
        settings: [
          this.enableKeywords
          && {textMissionType: TextMissionType.KEYWORDS, keywords: this.keywords},
          this.enableClassification
          && {textMissionType: TextMissionType.CLASSIFICATION, classes: this.classes}
        ].filter(x => !!x)
      } as TextMissionProperties
    }
  }

  valid(): boolean {
    return super.valid() && this.classificationValid && this.taskValid && this.zipValid;
  }


}
