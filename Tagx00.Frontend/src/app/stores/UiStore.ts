import { action, observable } from "mobx";
import { Injectable } from "react.di";

@Injectable
export class UiStore {
  @observable loginModalShown: boolean;
  @observable loginModalLoading: boolean;

  @action toggleLoginModalShown = () => {
    this.loginModalShown = !this.loginModalShown;
  };

  @action setLoginModalLoading = (loading: boolean) => {
    this.loginModalLoading = loading;
  }
}

export const CONTENT_SIDE_PADDING = 8;
