import { ImageNotation } from "./ImageWorkStore";
import { ImageMissionDetail } from "../../../../models/mission/image/ImageMission";
import { ImageJob } from "../../../../models/instance/image/job/ImageJob";

export interface ImageWorkPageProps<T extends ImageJob> {
  notation: ImageNotation<T>;
  submit: (notation: ImageNotation) => void;
  missionDetail: ImageMissionDetail;
  goNext: (notation: ImageNotation) => void;
  controllerProps: {
    goPrevious: () => void;
    previousAvailable: boolean;
    saving: boolean;
  },
  readonlyMode: boolean;
}

export interface ImageWorkPageStates<T extends ImageJob> {
  notation: ImageNotation<T>;
  selectedIndex: number;
  addingMode: boolean;
  width: number;
  height: number;
}
