import { action, computed, observable } from "mobx";

export class BrowserStore {
  @observable private _paused: boolean = true;
  @observable private _reverse: boolean = true;
  @action public reverseBrowsing = () => {
    this._reverse = !this._reverse;
    this._paused = !this._paused;
  };

  @computed get reverse(): boolean {
    return this._reverse;
  }

  @computed get paused(): boolean {
    return this._paused;
  }
}

export const STORE_BROWSER = "browser";

export interface BrowserProps {
  [STORE_BROWSER]?: BrowserStore
}
