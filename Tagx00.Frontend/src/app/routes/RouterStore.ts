import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { action, computed } from "mobx";
import { STORE_ROUTER } from "../constants/stores";
import routes, { notFoundPage, RouteConfig } from "./routes";


function getPage(pathname: string) {
  for (const p of routes) {
    if (p.isThisPage(pathname)) {
      return p;
    }
  }
  return notFoundPage;
}


export class RouterStore extends BaseRouterStore {
  constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  @computed get currentPage(): RouteConfig {
    return getPage(this.location.pathname);
  }

  @action jumpTo = (path: string) => {
    this.push(path);
  };
}

export interface RouterStoreProps {
  [STORE_ROUTER]?: RouterStore
}
