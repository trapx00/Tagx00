import { action, computed, observable } from "mobx";


interface MissionFinalizeVo {
  expRatio: number;
  credits: number;
  comment: string;
}

export enum CreditStatus {
  Acceptable,
  WrongFormat,
  CreditsNotSufficient,
  FirstAttempt
}


const defaultValue = { expRatio: 1, credits: 0, comment: ""};

export class MissionFinalizeParameters {
  @observable expRatio: string; // double
  @observable credits : string; // int
  @observable comment : string;

  @computed get creditsStatus() {
    const parsedInt = parseInt(this.credits);
    if (this.availableCredits != null && parsedInt > this.availableCredits) {
      return CreditStatus.CreditsNotSufficient;
    }

    if (!(parsedInt >=0)) {
      return CreditStatus.WrongFormat;
    }

    return CreditStatus.Acceptable;
  }

  @computed get expRadioValid() {
    const parsedValue = parseFloat(this.expRatio);
    return !Number.isNaN(parsedValue) && 0 < parsedValue && parsedValue <= 1;
  }

  @computed get creditsValid() {
    return this.creditsStatus === CreditStatus.Acceptable;
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

  constructor(public availableCredits: number = null) {
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
