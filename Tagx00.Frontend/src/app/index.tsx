import React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { STORE_LOCALE, STORE_ROUTER, STORE_UI, STORE_USER } from './constants/stores';
import switches from "./router";
import { RouterStore } from './router/RouterStore';
import { LocaleStore } from './internationalization';
import { UserStore } from "./stores/UserStore";
import { App } from "./layouts";
import { UiStore } from "./stores/UiStore";
import { configure } from "mobx";

// enable MobX strict mode
configure({ enforceActions: true });


function render(stores) {
  // render react DOM
  ReactDOM.render(
    <Provider {...stores}>
      <App>
      <Router history={history}>
        {switches}
      </Router>
      </App>
    </Provider>,
    document.getElementById('root')
  );
}

const history = createBrowserHistory();
const routerStore = new RouterStore(history);

async function resetStore() {
  const userStore = new UserStore();
  const localeStore = new LocaleStore();
  const uiStore = new UiStore();
  await localeStore.init();

  return {
    [STORE_ROUTER]: routerStore,
    [STORE_LOCALE]: localeStore,
    [STORE_USER]: userStore,
    [STORE_UI]: uiStore
  };
}

// prepare MobX stores

resetStore().then(stores => render(stores));

