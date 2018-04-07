import { ImageMissionType } from "../../../mission/image/ImageMission";
import { WholeJob } from "./WholeJob";
import { PartJob } from "./PartJob";
import { DistrictJob } from "./DistrictJob";


export interface ImageJob {
  type: ImageMissionType;
}
