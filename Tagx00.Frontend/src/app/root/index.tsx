import { RouterStore } from "../router/RouterStore";
import { LocaleStore } from "../internationalization";
import { UserStore } from "../stores/UserStore";
import { UiStore } from "../stores/UiStore";
import createBrowserHistory from "history/createBrowserHistory";
import { Inject, Module } from "react.di";
import { STORE_ROUTER } from "../constants/stores";
import * as React from "react";
import { Route, Router, Switch } from "react-router";
import { homePage } from "../router/routes/rootRoutes";
import { AsyncComponent } from "../router/AsyncComponent";
import { Root } from "./root";

export async function initProviders(history) {
  const userStore = new UserStore();
  const routerStore = new RouterStore(history);
  const localeStore = new LocaleStore();
  await localeStore.init();

  return [
    { provide: RouterStore, useValue: routerStore },
    { provide: UserStore, useValue: userStore},
    UiStore,
    { provide: LocaleStore, useValue: localeStore }
  ]

}

export interface AppProps {

}

export async function App() {
  const history = createBrowserHistory();
  const providers = await initProviders(history);
  return Module({
    providers: providers
  })(
  class App extends React.Component<AppProps, {}> {
    render() {
      return <Root history={history}/>
    }
  });
}
