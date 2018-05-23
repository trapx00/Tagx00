import { Redirect, Route, RouteComponentProps } from "react-router";
import { AsyncComponent } from "./AsyncComponent";
import React, { ReactNode } from 'react';
import { AsyncRoute } from "./AsyncRoute";

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
  component: Promise<any>;
}

export interface RedirectRouteConfig extends RouteConfig {
  type: RouteType.Redirect;
  to: string;
}

export type KnownRouteConfig = AsyncRouteConfig | RedirectRouteConfig;

export function constructRoute(config: KnownRouteConfig) {
  switch (config.type) {
    case RouteType.Async:
      return <AsyncRoute exact={config.exact} key={config.path} path={config.path} component={config.component}/>;
    case RouteType.Redirect:
      return <Redirect exact={config.exact} key={config.path} from={config.path} path={config.path} to={config.to}/>
  }
}
