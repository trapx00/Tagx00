import { Redirect, Route, RouteComponentProps } from "react-router";
import { AsyncComponent } from "../AsyncComponent";
import React, { ReactNode } from 'react';

export enum RouteType {
  Async,
  Redirect
}

export interface RouteConfig {
  path: string;
  exact: boolean;
  type: RouteType;
}

export interface AsyncRouteConfig extends RouteConfig {
  type: RouteType.Async;
  render(props: RouteComponentProps<any>): Promise<ReactNode>;
}

export interface RedirectRouteConfig extends RouteConfig {
  type: RouteType.Redirect;
  to: string;
}

export type KnownRouteConfig = AsyncRouteConfig | RedirectRouteConfig;

export function constructRoute(config: KnownRouteConfig) {
  switch (config.type) {
    case RouteType.Async:
      return <Route exact={config.exact} key={config.path} path={config.path}
                    render={props => <AsyncComponent render={config.render} props={props}/>}/>;
    case RouteType.Redirect:
      return <Redirect exact={config.exact} key={config.path} path={config.path} to={config.to}/>
  }
}

