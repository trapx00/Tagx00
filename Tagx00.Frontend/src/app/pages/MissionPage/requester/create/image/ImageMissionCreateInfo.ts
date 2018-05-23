import { computed, observable, toJS } from "mobx";
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { UploadFile } from "antd/lib/upload/interface";
import { MissionCreate } from "../../../../../models/mission/create/MissionCreate";
import { MissionType } from "../../../../../models/mission/Mission";
import { ImageMissionProperties } from "../../../../../models/mission/image/ImageMissionProperties";
import moment from "moment";
import { MissionCreateInfo } from "../MissionCreateInfo";


export class ImageMissionCreateInfo extends MissionCreateInfo {
  @observable imageMissionTypes: ImageMissionType[] = [];
  @observable images: UploadFile[] = [];

  @observable allowCustomTag: boolean = true;
  @observable allowedTags: string[] = [];

  missionCreateVo(): MissionCreate {
    return {
      ...super.missionCreateVo(),
      properties: {
        type: MissionType.IMAGE,
        imageMissionTypes: this.imageMissionTypes,
        allowCustomTag: this.allowCustomTag,
        allowedTags: this.allowedTags,
      } as ImageMissionProperties
    }
  }

  @computed get allowedTagsValid() {
    return !this.createAttempted || !(!this.allowCustomTag && this.allowedTags.length == 0);
  }

  @computed get imageTypesValid() {
    return !this.createAttempted || this.imageMissionTypes.length > 0;
  }

  @computed get imagesValid() {
    return !this.createAttempted || this.images.length > 0;
  }

  @computed get valid() {
    return super.baseValid() && this.allowedTagsValid && this.imageTypesValid && this.imagesValid;
  }
}
