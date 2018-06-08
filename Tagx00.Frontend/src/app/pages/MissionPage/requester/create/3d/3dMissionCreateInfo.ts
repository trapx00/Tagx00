import { UploadFile } from "antd/lib/upload/interface";
import { computed, observable } from "mobx";
import { MissionCreate } from "../../../../../models/mission/create/MissionCreate";
import { MissionType } from "../../../../../models/mission/Mission";
import { MissionCreateInfo } from "../MissionCreateInfo";
import { ThreeDimensionMissionProperties } from "../../../../../models/mission/3d/3dMissionProperties";

export interface ThreeDimensionModel {
  mtl: UploadFile,
  obj: UploadFile
}
export class ThreeDimensionMissionCreateInfo extends MissionCreateInfo {
  @observable threeDimensions: ThreeDimensionModel[] = [];

  @observable allowCustomTag: boolean = true;
  @observable tags: string[] = [];

  missionCreateVo(): MissionCreate {
    return {
      ...super.missionCreateVo(),
      properties: {
        type: MissionType.THREE_DIMENSION,
        allowCustomTag: this.allowCustomTag,
        tags: this.tags,
      } as ThreeDimensionMissionProperties
    }
  }

  @computed get allowedTagsValid() {
    return !this.createAttempted || !(!this.allowCustomTag && this.tags.length == 0);
  }


  @computed get threeDimensionsValid() {
    return !this.createAttempted || this.threeDimensions.length > 0;
  }

  @computed get mulMatchObjValid() {
    return ;
  }

  valid() {
    return super.valid() && this.allowedTagsValid && this.threeDimensionsValid;
  }

}
