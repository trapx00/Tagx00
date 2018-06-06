import { UploadFile } from "antd/lib/upload/interface";
import { computed, observable } from "mobx";
import { MissionCreate } from "../../../../../models/mission/create/MissionCreate";
import { MissionType } from "../../../../../models/mission/Mission";
import { MissionCreateInfo } from "../MissionCreateInfo";
import { ThreeDimensionMissionProperties } from "../../../../../models/mission/3d/3dMissionProperties";

export class ThreeDimensionMissionCreateInfo extends MissionCreateInfo {
  @observable threeDimensions: UploadFile[] = [];

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


  @computed get threeDsValid() {
    return !this.createAttempted || this.threeDimensions.length > 0;
  }

  valid() {
    return super.valid() && this.allowedTagsValid && this.threeDsValid;
  }

}
