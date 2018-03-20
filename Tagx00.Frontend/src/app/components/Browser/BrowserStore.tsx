import { action, computed, observable } from "mobx";

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

export const STORE_BROWSER = "browser";

export interface BrowserProps {
  [STORE_BROWSER]?: BrowserStore
}
