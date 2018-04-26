import React, { ReactNode } from 'react';
import { Route, RouteComponentProps } from "react-router";
import { AsyncComponent, ObserverAsyncComponent } from "./AsyncComponent";
import { observer } from "mobx-react";

interface Props<T> {
  path: string;
  exact?: boolean;
  render: (props: RouteComponentProps<T>) => Promise<ReactNode>;
}

export class AsyncRoute<T> extends React.Component<Props<T>, {}> {

  static defaultProps = {
    exact: false
  };

  render() {
    return <Route path={this.props.path} exact={this.props.exact}
                  render={props => <ObserverAsyncComponent render={this.props.render} props={props}/>}/>;
  }
}