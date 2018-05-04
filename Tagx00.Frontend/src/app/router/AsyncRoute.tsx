import React, { ReactNode } from 'react';
import { Route, RouteComponentProps } from "react-router";
import { AsyncComponent, ObserverAsyncComponent } from "./AsyncComponent";
import { observer } from "mobx-react";

interface Props<T> {
  path: string;
  exact?: boolean;
  render: (props: RouteComponentProps<T>) => Promise<ReactNode>;
}

export function AsyncRoute<T>(props: Props<T>) {

    return <Route path={props.path} exact={props.exact}
                  render={props1 => <ObserverAsyncComponent render={props.render} props={props1}/>}/>;

}
