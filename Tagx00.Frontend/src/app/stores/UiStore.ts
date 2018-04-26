import { action, observable } from "mobx";
import { Injectable } from "react.di";

@Injectable
export class UiStore {
  @observable loginModalShown: boolean;
  @observable loginModalLoading: boolean;


  @observable contentSidePadding = 8;

  @action toggleLoginModalShown = () => {
    this.loginModalShown = !this.loginModalShown;
  };

  @action setLoginModalLoading = (loading: boolean) => {
    this.loginModalLoading = loading;
  }
}
