import { Route, Switch } from "react-router";
import * as React from "react";
import routes from './routes';
import { AsyncComponent } from "./AsyncComponent";

export default <Switch>
  {routes.map(x => {
    return <Route
      exact={x.exact}
      key={x.path}
      path={x.path}
      render={props => <AsyncComponent render={x.render} props={props}/>}/>
  })}
</Switch>;
