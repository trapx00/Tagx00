import { Injectable } from "react.di";
import { action, computed, observable } from "mobx";

@Injectable
export class HomeStore {
  @observable private _bodyWidth: number = 0;
  @observable private _bodyHeight: number = 0;
  @observable private _endLine: number = 0;
  @observable private _centerLine: number = 0;

  @computed get centerLine(): number {
    return this._centerLine;
  }

  @action set centerLine(value: number) {
    this._centerLine = value;
  }

  @computed get endLine(): number {
    return this._endLine;
  }

  @action set endLine(value: number) {
    this._endLine = value;
  }

  @computed get bodyWidth(): number {
    return this._bodyWidth;
  }

  @action set bodyWidth(value: number) {
    this._bodyWidth = value;
  }

  @computed get bodyHeight(): number {
    return this._bodyHeight;
  }

  @action set bodyHeight(value: number) {
    this._bodyHeight = value;
  }
}