import React from 'react';

import { inject, observer } from "mobx-react";
import { AsyncComponent } from "../router/AsyncComponent";
import { STORE_ROUTER } from "../constants/stores";
import { RouterStoreProps } from "../router/RouterStore";
import { History } from "history";
import { Route, Router, Switch } from "react-router";
import { homePage } from "../router/routes/rootRoutes";
import { RouteConfig } from "../router/routes/RouteConfig";
import { BaseLayout } from "../layouts/BaseLayout";


export interface AppProps {
  history: History;
}

async function renderDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = (await import('mobx-react-devtools')).default;
    return (<DevTools/>);
  } else {
    return null;
  }
}


export class App extends React.Component<AppProps, {}> {

  renderPagesWithBaseLayout = async () => {
    const Page = (await import("./PagesWithBaseLayout")).PageWithBaseLayout;
    return <Page history={this.props.history}/>
  };

  render() {
    const router = this.props[STORE_ROUTER];
    return <div>
      <Router history={this.props.history}>
        <Switch>
          {homePage.construct()}
          <Route render={props => <AsyncComponent render={this.renderPagesWithBaseLayout} props={props}/>}/>
        </Switch>
      </Router>
      <AsyncComponent render={renderDevTool}/>
    </div>;
  }
}
