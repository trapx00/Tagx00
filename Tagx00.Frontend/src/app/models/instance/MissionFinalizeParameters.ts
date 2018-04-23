import { action, computed, observable } from "mobx";


export interface MissionFinalizeVo {
  expRatio: number;
  credits: number;
  comment: string;
}


const defaultValue = { expRatio: 1, credits: 0, comment: ""};

export class MissionFinalizeParameters {
  @observable expRatio: string; // double
  @observable credits : number = 0; // int
  @observable creditsValid: boolean = true;
  @observable comment : string;

  @computed get expRadioValid() {
    const parsedValue = parseFloat(this.expRatio);
    return !Number.isNaN(parsedValue) && 0 < parsedValue && parsedValue <= 1;
  }

  @computed get valid() {
    return this.expRadioValid && this.creditsValid;
  }

  get value(): MissionFinalizeVo {
    return {
      expRatio: parseFloat(this.expRatio),
      credits: this.credits,
      comment: this.comment
    }
  }

  constructor() {
    this.backToDefault();
  }

  set value(value: MissionFinalizeVo) {
    this.comment = value.comment;
    this.credits = value.credits;
    this.expRatio = value.expRatio + "";
  }

  @action backToDefault = () => {
    this.value = defaultValue;
  };

}
