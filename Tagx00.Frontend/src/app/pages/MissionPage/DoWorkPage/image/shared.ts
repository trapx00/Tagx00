import { ImageMissionDetail } from "../../../../models/mission/image/ImageMission";
import { ImageJob } from "../../../../models/instance/image/job/ImageJob";
import { WorkPageProps, WorkPageState } from "../WorkPage";
import { MissionAsset } from "../../../../models/mission/MissionAsset";
import { Notation } from "../WorkPageController";

export interface ImageNotation<T extends ImageJob = ImageJob> extends Notation<T> {
  imageAsset: MissionAsset;
}

export interface ImageWorkPageProps<T extends ImageJob> extends WorkPageProps<ImageMissionDetail, T, ImageNotation<T>> {

}

export interface ImageWorkPageStates<T extends ImageJob> extends WorkPageState<T, ImageNotation<T>>{
  width: number;
  height: number;
}
