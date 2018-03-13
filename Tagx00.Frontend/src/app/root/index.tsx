import * as React from 'react';

import { observer } from "mobx-react";
import ScrollUpButton from "react-scroll-up-button"
import { AsyncComponent } from "../routes/AsyncComponent";

export interface AppProps {

}


async function renderDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = (await import('mobx-react-devtools')).default;
    return (<DevTools />);
  } else {
    return null;
  }
}

@observer
export class App extends React.Component<AppProps, {}> {


  render() {
    return <div>
      <ScrollUpButton/>
      {this.props.children}
      <AsyncComponent render={renderDevTool}/>
    </div>;
  }
}
