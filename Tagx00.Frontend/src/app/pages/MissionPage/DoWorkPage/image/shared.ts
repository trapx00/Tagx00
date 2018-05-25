import { ImageNotation } from "./ImageWorkPageController";
import { ImageMissionDetail } from "../../../../models/mission/image/ImageMission";
import { ImageJob } from "../../../../models/instance/image/job/ImageJob";
import { WorkPageProps } from "../WorkPage";

export interface ImageWorkPageProps<T extends ImageJob> extends WorkPageProps<ImageMissionDetail, T, ImageNotation<T>> {

}

export interface ImageWorkPageStates<T extends ImageJob> {
  notation: ImageNotation<T>;
  selectedIndex: number;
  addingMode: boolean;
  width: number;
  height: number;
}
