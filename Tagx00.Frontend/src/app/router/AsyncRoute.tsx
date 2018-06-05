import React, { ReactNode } from 'react';
import { Route, RouteComponentProps } from "react-router";
import { ObserverAsyncComponent } from "./AsyncComponent";
import { Inject } from "react.di";
import { NavStore } from "../stores/NavStore";
import { action, runInAction } from "mobx";
import { waitForMs } from "../../utils/Wait";

interface Props<T> {
  path: string;
  exact?: boolean;
  component?: Promise<any>;
  render?: (props: RouteComponentProps<T>) => Promise<ReactNode>;
}

export class AsyncRoute<T> extends React.PureComponent<Props<T>> {


  @Inject navStore: NavStore;


  renderRoute = (props) => {
    this.navStore.showLoadingBar();
    return <ObserverAsyncComponent
      render={this.props.component
        ? async () => {
          return React.createElement((await this.props.component).default, props)
        }
        : this.props.render}
      props={props}
      onRenderSuccess={() => {
        this.navStore.hideLoadingBar();
      }}
    />;
  };

  render() {
    return <Route path={this.props.path} exact={this.props.exact}
                  render={this.renderRoute}/>;
  }
}
