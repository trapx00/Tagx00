import { InstanceDetail } from "../InstanceDetail";
import { ImageResult } from "./ImageResult";
import { MissionType } from "../../mission/Mission";

export interface ImageInstanceDetail extends InstanceDetail {
  imageResults: ImageResult[];
  missionType: MissionType.IMAGE;
}
