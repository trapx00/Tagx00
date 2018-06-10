import { MissionCreateInfo } from "../MissionCreateInfo";
import { computed, observable } from "mobx";
import { UploadFile } from "antd/es/upload/interface";
import { AudioMissionType } from "../../../../../models/mission/audio/AudioMission";
import { MissionCreate } from "../../../../../models/mission/create/MissionCreate";
import { MissionType } from "../../../../../models/mission/Mission";
import { AudioMissionProperties } from "../../../../../models/mission/audio/AudioMissionProperties";

export class AudioMissionCreateInfo extends MissionCreateInfo {
  @observable audioMissionTypes: AudioMissionType[] = [];
  @observable audios: UploadFile[] = [];
  @observable allowCustomTag: boolean = true;
  @observable allowedTags: string[] = [];

  missionCreateVo(): MissionCreate {
    return {
      ...super.missionCreateVo(),
      properties: {
        type: MissionType.AUDIO,
        audioMissionTypes: this.audioMissionTypes,
        allowCustomTag: this.allowCustomTag,
        tags: this.allowedTags,
      } as AudioMissionProperties
    }
  }

  @computed get audiosValid() {
    return !this.createAttempted || !!this.audios;
  }
  @computed get allowedTagsValid() {
    return !this.createAttempted || !(!this.allowCustomTag && this.allowedTags.length == 0);
  }

  @computed get audioTypesValid() {
    return !this.createAttempted || this.audioMissionTypes.length > 0;
  }

  valid() {
    return super.valid() && this.allowedTagsValid && this.audioTypesValid && this.audiosValid;
  }
}