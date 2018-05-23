import React, { ReactNode } from 'react';
import { Route, RouteComponentProps } from "react-router";
import { ObserverAsyncComponent } from "./AsyncComponent";

interface Props<T> {
  path: string;
  exact?: boolean;
  component?: Promise<any>;
  render?: (props: RouteComponentProps<T>) => Promise<ReactNode>;
}

export function AsyncRoute<T>(props: Props<T>) {


    return <Route path={props.path} exact={props.exact}
                  render={props1 => <ObserverAsyncComponent
                      render={props.component
                        ? async () => React.createElement((await props.component).default, props1)
                        : props.render}
                      props={props1}/>
                  }/>;

}
