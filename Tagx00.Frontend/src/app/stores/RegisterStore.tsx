import { action, computed, observable } from "mobx";
import { Injectable } from "react.di";

@Injectable
export class RegisterStore {
  @observable private _step: number = 0;
  @observable private _token: string = "";
  @action public nextStep = () => {
    this._step++;
  };
  @action public backStep = () => {
    this._step--;
  };

  @computed
  set token(value: string) {
    this._token = value;
  }

  @computed
  get currentStep(): number {
    return this._step;
  }
}

