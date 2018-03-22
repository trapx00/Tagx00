import { ImageMissionType } from "../models/mission/ImageMission";
import { action, computed, observable } from "mobx";
import { ImageInstance } from "../models/instance/image/ImageInstance";
import { ImageInstanceDetail } from "../models/instance/image/ImageInstanceDetail";
import { ImageJob } from "../models/instance/image/job/ImageJob";
import { RectangleNotationItemComponent } from "../components/ImageWork/DrawingPad/RectanglePanel/RectangleNotationItemComponent";

export interface ImageNotation<T extends ImageJob = ImageJob> {
  imageUrl: string;
  job: T;
}

export class ImageWorkStore {
  imageUrls: string[];
  types: ImageMissionType[];

  currentNotations: ImageNotation[] = [];


  @observable workIndex: number = 0;


  constructor(imageUrls: string[], types: ImageMissionType[], instanceDetail: ImageInstanceDetail) {
    this.imageUrls = imageUrls;
    this.types = types;

    for (const url of imageUrls ) {
      for (const type of types) {
        const result = instanceDetail.results.find(x => x.url === url && x.imageJob && x.imageJob.type === type);
        if (result) { //existing job, push in
          this.currentNotations.push({
            imageUrl: url,
            job : result.imageJob
          });
          this.workIndex++; // existing job, resume progress
        } else {
          this.currentNotations.push({
            imageUrl: url,
            job: {
              type: type
            }
          });
        }
      }
    }

  }

  get totalCount() {
    return this.currentNotations.length;
}

  @computed get progress() {
    return this.workIndex;
  }

  @computed get currentWork(): ImageNotation {
    if (this.workIndex == this.currentNotations.length) {
      return null;
    } else {
      return this.currentNotations[this.workIndex];
    }

  }

  @action saveWork(notation: ImageNotation) {
    this.currentNotations[this.workIndex] = notation;
  }

  @action nextWork() {
    this.workIndex++;
  }

  @action previousWork() {
    if (this.workIndex > 0) {
      this.workIndex--;
    }
  }

}

export const STORE_IMAGEWORK = "STORE_IMAGEWORK";

export interface ImageWorkStoreProps {
  [STORE_IMAGEWORK]?: ImageWorkStore;
}
