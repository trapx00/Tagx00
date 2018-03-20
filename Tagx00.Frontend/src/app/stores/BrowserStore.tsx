import { action, computed, observable } from "mobx";
import { STORE_BROWSER } from "../components/Browser/BrowserStore";

export class BrowserStore {
  @observable private isBrowsing: boolean = false;
  @action public reverseBrowsing = () => {
    this.isBrowsing = !this.isBrowsing;
  };

  @computed
  public get browsing() {
    return this.isBrowsing;
  }
}

export interface BrowserProps {
  [STORE_BROWSER]?: BrowserStore
}
