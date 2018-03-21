import { action, computed, observable } from "mobx";

interface listDataProps {
  missionId: number,
  coverUrl: string,
  title: string,
  tags: any,
  description: string
}

export class BrowserStore {
  @observable private _paused: boolean = true;
  @observable private _reverse: boolean = true;
  @observable private _listData: listDataProps[] = [];
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
