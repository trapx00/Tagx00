import { action, computed, observable } from "mobx";


interface MissionFinalizeVo {
  expRatio: number;
  credits: number;
  comment: string;
}

const defaultValue = { expRatio: 1, credits: 0, comment: ""};

export class MissionFinalizeParameters {
  @observable expRatio: string; // double
  @observable credits : string; // int
  @observable comment : string;
  @observable submitAttempted: boolean = false;

  @computed get expRadioValid() {
    return !this.submitAttempted || !Number.isNaN(parseFloat(this.expRatio));
  }

  @computed get creditsValid() {
    return !this.submitAttempted || parseInt(this.credits) >= 0;
  }

  @computed get valid() {
    return this.expRadioValid && this.creditsValid;
  }

  get value(): MissionFinalizeVo {
    return {
      expRatio: parseFloat(this.expRatio),
      credits: parseInt(this.credits),
      comment: this.comment
    }
  }

  constructor(value: MissionFinalizeVo = defaultValue) {
    this.backToDefault();
  }

  set value(value: MissionFinalizeVo) {
    this.comment = value.comment;
    this.credits = value.credits + "";
    this.expRatio = value.expRatio + "";
  }

  @action backToDefault = () => {
    this.value = defaultValue;
  };

}
