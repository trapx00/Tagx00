import React from 'react';

import { inject, observer } from "mobx-react";
import { AsyncComponent } from "../router/AsyncComponent";
import { STORE_ROUTER } from "../constants/stores";
import { RouterStoreProps } from "../router/RouterStore";

export interface AppProps extends RouterStoreProps {

}


async function renderDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = (await import('mobx-react-devtools')).default;
    return (<DevTools/>);
  } else {
    return null;
  }
}

@inject(STORE_ROUTER)
@observer
export class App extends React.Component<AppProps, {}> {

  render() {
    const router = this.props[STORE_ROUTER];
    return <div>
      {this.props.children}
      <AsyncComponent render={renderDevTool}/>
    </div>;
  }
}
