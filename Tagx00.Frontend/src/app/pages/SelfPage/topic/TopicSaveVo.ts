import { computed, observable, toJS } from "mobx";


export class TopicSaveVo {
  @observable topicId: number;
  @observable value: string;

  get TopivSaveVo() {
    return toJS({
      topicId:this.topicId,
      value:this.value
    })
  }

}