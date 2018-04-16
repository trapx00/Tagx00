import { computed, observable } from "mobx";
import { ImageMissionType } from "../../../../../models/mission/image/ImageMission";
import { UploadFile } from "antd/lib/upload/interface";
import { MissionCreate } from "../../../../../models/mission/create/MissionCreate";
import { MissionType } from "../../../../../models/mission/Mission";
import { ImageMissionProperties } from "../../../../../models/mission/image/ImageMissionProperties";

export class ImageMissionCreateInfo {
  @observable title: string = "";
  @observable description: string = "";

  @observable imageMissionTypes: ImageMissionType[] = [];
  @observable images: UploadFile[] = [];

  @observable coverImage: UploadFile = null;

  @observable createAttempted: boolean = false;

  get missionCreateVo(): MissionCreate<ImageMissionProperties> {
    return {
      title: this.title,
      description: this.description,
      topics: [],
      allowCustomTag: true,
      allowedTags: ["tag1"],
      properties: {
        type: MissionType.IMAGE,
        imageMissionTypes: this.imageMissionTypes
      },
      start: new Date(),
      end: new Date(Date.now() + 5*24*3600*1000),
      missionType: MissionType.IMAGE
    };
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

  @computed get valid() {
    return this.titleValid && this.descriptionValid && this.typesValid;
  }
}
