import { UploadFile } from "antd/lib/upload/interface";
import { computed, observable } from "mobx";
import { MissionCreate } from "../../../../../models/mission/create/MissionCreate";
import { MissionType } from "../../../../../models/mission/Mission";
import { MissionCreateInfo } from "../MissionCreateInfo";
import { VideoMissionType } from "../../../../../models/mission/video/VideoMission";
import { VideoMissionProperties } from "../../../../../models/mission/video/VideoMissionProperties";

export class VideoMissionCreateInfo extends MissionCreateInfo {
  @observable videoMissionTypes: VideoMissionType[] = [];
  @observable videos: UploadFile[] = [];

  @observable allowCustomTag: boolean = true;
  @observable tags: string[] = [];

  missionCreateVo(): MissionCreate {
    return {
      ...super.missionCreateVo(),
      properties: {
        type: MissionType.VIDEO,
        videoMissionTypes: this.videoMissionTypes,
        allowCustomTag: this.allowCustomTag,
        tags: this.tags,
      } as VideoMissionProperties
    }
  }

  @computed get allowedTagsValid() {
    return !this.createAttempted || !(!this.allowCustomTag && this.tags.length == 0);
  }

  @computed get videoTypesValid() {
    return !this.createAttempted || this.videoMissionTypes.length > 0;
  }

  @computed get videosValid() {
    return !this.createAttempted || this.videos.length > 0;
  }

  valid() {
    return super.valid() && this.allowedTagsValid && this.videoTypesValid && this.videosValid;
  }
}
