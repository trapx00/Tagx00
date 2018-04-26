import createBrowserHistory from "history/createBrowserHistory";
import { Module } from "react.di";
import React from "react";
import { initProviders } from "../../providers";
import { AsyncRouteConfig, constructRoute, RouteType } from "../../router/RouteConfig";
import { Router, Switch } from "react-router";
import { AsyncComponent } from "../../router/AsyncComponent";
import { BaseLayoutPage } from "./BaseLayoutPage";

async function renderDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = (await import('mobx-react-devtools')).default;
    return (<DevTools/>);
  } else {
    return null;
  }
}
export interface AppProps {

}

export const notFoundPage: AsyncRouteConfig = {
  type: RouteType.Async,
  path: "",
  render: async (props) => {
    const NotFoundPage = (await import("../../pages/NotFound")).NotFoundPage;
    return <NotFoundPage/>
  },
  exact: false
};

export const homePage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/",
  render: async (props) => {
    const HomePage = (await import("../HomePage")).HomePage;
    return <HomePage/>;
  },
};


export async function App() {
  const history = createBrowserHistory();
  const providers = await initProviders(history);
  return Module({
    providers: providers
  })(
  class App extends React.Component<AppProps, {}> {
    render() {
      return <div>
        <Router history={history}>
          <Switch>
            {constructRoute(homePage)}
            <BaseLayoutPage/>
            {constructRoute(notFoundPage)}
          </Switch>
        </Router>
        <AsyncComponent render={renderDevTool}/>
      </div>;
    }
  });
}
