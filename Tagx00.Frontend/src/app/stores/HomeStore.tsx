import { Injectable } from "react.di";
import { action, computed, observable } from "mobx";

@Injectable
export class HomeStore {
  @observable bodyWidth: number = 0;
  @observable bodyHeight: number = 0;
  @observable endLine: number = 0;
  @observable centerLine: number = 0;
}
