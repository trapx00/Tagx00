import React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { STORE_LOCALE, STORE_ROUTER, STORE_UI, STORE_USER } from './constants/stores';
import { RouterStore } from './router/RouterStore';
import { LocaleStore } from './internationalization';
import { UserStore } from "./stores/UserStore";
import { UiStore } from "./stores/UiStore";
import { configure } from "mobx";
import { App } from "./root";

// enable MobX strict mode
configure({enforceActions: true});

const history = createBrowserHistory();
const routerStore = new RouterStore(history);

function render(stores) {
  // render react DOM
  ReactDOM.render(
    <Provider {...stores}>
      <App history={history}/>
    </Provider>,
    document.getElementById('root')
  );
}


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

