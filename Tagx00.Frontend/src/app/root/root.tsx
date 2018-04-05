import React from 'react';
import { Inject } from "react.di";
import { RouterStore } from "../router/RouterStore";
import { homePage } from "../router/routes/rootRoutes";
import { Route, Router, Switch } from "react-router";
import { AsyncComponent } from "../router/AsyncComponent";

interface Props {
  history;
}


async function renderDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = (await import('mobx-react-devtools')).default;
    return (<DevTools/>);
  } else {
    return null;
  }
}

export class Root extends React.Component<Props, {}> {

  renderPagesWithBaseLayout = async () => {
    const Page = (await import("./PagesWithBaseLayout")).PageWithBaseLayout;
    return <Page history={this.props.history}/>
  };

  render() {
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
