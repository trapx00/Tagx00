import React from 'react';
import { homePage } from "../router/routes/rootRoutes";
import { Route, Router, Switch } from "react-router";
import { AsyncComponent } from "../router/AsyncComponent";
import { observer } from "mobx-react";
import { constructRoute } from "../router/routes/RouteConfig";

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

@observer
export class Root extends React.Component<Props, {}> {

  renderPagesWithBaseLayout = async () => {
    const Page = (await import("./PagesWithBaseLayout")).PageWithBaseLayout;
    return <Page history={this.props.history}/>
  };



  render() {

    return <div>
      <Router history={this.props.history}>
        <Switch>
          {constructRoute(homePage)}
          <Route render={props => <AsyncComponent render={this.renderPagesWithBaseLayout} props={props}/>}/>
        </Switch>
      </Router>
      <AsyncComponent render={renderDevTool}/>
    </div>;
  }
}
