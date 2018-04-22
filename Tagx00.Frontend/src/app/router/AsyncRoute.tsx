import React, { ReactNode } from 'react';
import { Route, RouteComponentProps } from "react-router";
import { AsyncComponent } from "./AsyncComponent";

interface Props<T> {
  path: string;
  exact: boolean;
  render: (props: RouteComponentProps<T>) => Promise<ReactNode>;
}

export class AsyncRoute<T> extends React.Component<Props<T>, {}> {

  render() {
    return <Route path={this.props.path} exact={this.props.exact}
                  render={props => <AsyncComponent render={this.props.render} props={props}/>}
                  />;
  }
}
