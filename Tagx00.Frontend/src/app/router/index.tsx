import { Route, Switch } from "react-router";
import React from "react";
import routes from './routes';
import { AsyncComponent } from "./AsyncComponent";

export default <Switch>
  {routes.map(x => x.construct())}
</Switch>;
