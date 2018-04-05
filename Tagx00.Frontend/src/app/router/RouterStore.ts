import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { action, computed } from "mobx";
import { STORE_ROUTER } from "../constants/stores";
import routes from './routes';
import { RouteConfig } from "./routes/RouteConfig";
import { Injectable } from "react.di";

@Injectable
export class RouterStore extends BaseRouterStore {
  constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  @computed get path() {
    return this.location.pathname;
  }


  @action jumpTo = (path: string) => {
    this.push(path);
  };
}
