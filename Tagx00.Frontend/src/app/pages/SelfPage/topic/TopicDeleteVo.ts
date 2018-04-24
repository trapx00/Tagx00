import { computed, observable, toJS } from "mobx";
import { TopicDelete } from "../../../models/topic/TopicDelete";

export class TopicDeleteVo {
  @observable topicIds: number[];

  get topicDelete(): TopicDelete {
    return toJS({
      topicIds: this.topicIds
    });
  }
}