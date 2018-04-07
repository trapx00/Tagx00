import { action, computed, observable } from "mobx";
import { ImageInstanceDetail } from "../models/instance/image/ImageInstanceDetail";
import { ImageJob } from "../models/instance/image/job/ImageJob";
import { ImageMissionType } from "../models/mission/image/ImageMission";
import { ImageResult } from "../models/instance/image/ImageResult";

export interface ImageNotation<T extends ImageJob = ImageJob> {
  imageUrl: string;
  job: T;
  done: boolean;
}


export class ImageWorkStore {
  imageUrls: string[];
  types: ImageMissionType[];


  currentNotations: ImageNotation[] = [];

  initialDetail: ImageInstanceDetail;

  get currentInstanceDetail(): ImageInstanceDetail {
    const {instance} = this.initialDetail;
    return {
      imageResults: this.currentNotations.map((x, index) => ({
        id: index,
        instanceId: instance.instanceId,
        imageJob: this.currentNotations[index].job,
        url: this.currentNotations[index].imageUrl,
        isDone: x.done
      })),
      instance: instance
    }
  }

  @observable workIndex: number = 0;


  constructor(imageUrls: string[], types: ImageMissionType[], instanceDetail: ImageInstanceDetail) {
    this.imageUrls = imageUrls;
    this.types = types;

    this.initialDetail = instanceDetail;


    for (const url of imageUrls) {
      for (const type of types) {
        let result: ImageResult;
        //confirm if results exists
        if (instanceDetail.imageResults) {
          result = instanceDetail.imageResults.find(x => x.url === url && x.imageJob && x.imageJob.type === type);
        } else {
          result = null;
        }
        if (result) { //existing job, push in
          this.currentNotations.push({
            imageUrl: url,
            job: result.imageJob,
            done: result.isDone
          });
          // this.workIndex++; // existing job, resume progress
        } else {
          this.currentNotations.push({
            imageUrl: url,
            job: {
              type: type
            },
            done: false
          });
        }
      }
    }

  }

  @computed get finished() {
    return this.workIndex === this.currentNotations.length;
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
    notation.done = true;
    this.currentNotations[this.workIndex] = notation;
  }

  @action nextWork() { // second step of going next work
    this.workIndex++;
  }


  @action previousWork() {
    if (this.workIndex > 0) {
      this.workIndex--;
    }
  }

}
