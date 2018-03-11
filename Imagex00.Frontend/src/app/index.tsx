import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import { STORE_ROUTER, STORE_UI, STORE_USER, STORE_LOCALE } from './constants/stores';
import { switches } from "./routes/routes";
import { RouterStore } from './stores/RouterStore';
import { LocaleStore } from './internationalization';
import { App } from './root';

// enable MobX strict mode
useStrict(true);


function render(stores) {
  // render react DOM
  ReactDOM.render(
    <Provider {...stores} >
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
  const localeStore = new LocaleStore();
  await localeStore.init();

  return {
    [STORE_ROUTER]: routerStore,
    [STORE_LOCALE]: localeStore,
  };
}
// prepare MobX stores

resetStore().then(stores => render(stores));

