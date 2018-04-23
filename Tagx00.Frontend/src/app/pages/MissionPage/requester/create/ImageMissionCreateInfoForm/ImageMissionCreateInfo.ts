import { computed, observable, toJS } from "mobx";
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { UploadFile } from "antd/lib/upload/interface";
import { MissionCreate } from "../../../../../models/mission/create/MissionCreate";
import { MissionType } from "../../../../../models/mission/Mission";
import { ImageMissionProperties } from "../../../../../models/mission/image/ImageMissionProperties";
import moment from "moment";

export enum CreditStatus {
  Acceptable,
  WrongFormat,
  CreditsNotSufficient,
  Loading,
  FirstAttempt
}


export class ImageMissionCreateInfo {
  @observable title: string = "";
  @observable description: string = "";
  @observable remainingCredits = -1;
  @observable imageMissionTypes: ImageMissionType[] = [];
  @observable images: UploadFile[] = [];

  @observable topics: string[] = [];
  @observable allowCustomTag: boolean = true;
  @observable allowedTags: string[] = [];
  @observable dateRange: [moment.Moment, moment.Moment] = [null,null];
  @observable level: string = "1";
  @observable minimalWorkerLevel: string = "1";
  @observable credits: string = "0";
  @observable coverImage: UploadFile = null;

  @observable createAttempted: boolean = false;

  get missionCreateVo(): MissionCreate<ImageMissionProperties> {
    return toJS({
      title: this.title,
      description: this.description,
      topics: this.topics,
      allowCustomTag: this.allowCustomTag,
      allowedTags: this.allowedTags,
      properties: {
        type: MissionType.IMAGE,
        imageMissionTypes: this.imageMissionTypes
      },
      start: this.dateRange[0].toDate(),
      end: this.dateRange[1].toDate(),
      minimalWorkerLevel: parseInt(this.minimalWorkerLevel),
      level: parseInt(this.level),
      credits: parseInt(this.credits),
      missionType: MissionType.IMAGE
    });
  }

  @computed get titleValid() {
    return !this.createAttempted || !!this.title;
  }

  @computed get descriptionValid() {
    return !this.createAttempted || !!this.description;
  }

  @computed get typesValid() {
    return !this.createAttempted || this.imageMissionTypes.length >0;
  }

  @computed get allowedTagsValid() {
    return !this.createAttempted || !(!this.allowCustomTag && this.allowedTags.length ==0 );
  }

  @computed get dateRangeValid() {
    return !this.createAttempted || this.dateRange[0] != null;
  }

  @computed get imageTypesValid() {
    return !this.createAttempted || this.imageMissionTypes.length >0;
  }

  @computed get imagesValid() {
    return !this.createAttempted || this.images.length > 0;
  }

  @computed get minimalWorkerLevelValid() {
    const parsed = parseInt(this.minimalWorkerLevel);
    if (isNaN(parsed)) return false;
    return 1<=parsed && parsed <=100;
  }

  @computed get creditsStatus(): CreditStatus {
    if (this.remainingCredits == -1) {
      return CreditStatus.Loading;
    }
    const parsed = parseInt(this.credits);
    if (isNaN(parsed)) return CreditStatus.WrongFormat;
    if (parsed > this.remainingCredits) {
      return CreditStatus.CreditsNotSufficient;
    }
    return CreditStatus.Acceptable;
  }

  @computed get levelValid() {
    const parsed = parseInt(this.level);
    if (isNaN(parsed)) return false;
    return 1<=parsed && parsed <=5;
  }


  @computed get valid() {
    return this.titleValid && this.descriptionValid
      && this.typesValid && this.allowedTagsValid
      && this.dateRangeValid && this.imageTypesValid
    && this.imagesValid && this.minimalWorkerLevelValid && this.levelValid
    && this.creditsStatus === CreditStatus.Acceptable;
  }
}
