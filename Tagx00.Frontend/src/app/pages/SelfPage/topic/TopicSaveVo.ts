import { computed, observable, toJS } from "mobx";
import { TopicSave } from "../../../models/topic/TopicSave";


export class TopicSaveVo {
  @observable topicId: number;
  @observable value: string;
  tmp:string[]

  get topicSave(): TopicSave {
    return toJS({
        topics: this.tmp[this.value]
      });
  }

}