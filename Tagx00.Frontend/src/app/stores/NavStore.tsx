import { Injectable } from "react.di";
import { action, observable } from "mobx";

export interface NavItemProps {
  path: string;
  iconName?: string;
  id: string;
  match(pathname: string): boolean;
}

@Injectable
export class NavStore {
  @observable navMenuShown: boolean = true;

  @observable currentSubNavs: NavItemProps[] = [];

  @observable pageWideLoadingBarShown = false;

  @action showLoadingBar() {
    this.pageWideLoadingBarShown = false;
    this.pageWideLoadingBarShown = true;
  }

  @action hideLoadingBar() {
    this.pageWideLoadingBarShown = false;
  }
}
