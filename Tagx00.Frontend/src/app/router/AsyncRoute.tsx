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


  @action renderRoute = (props) => {
    this.navStore.pageWideLoadingBarShown = true;
    console.log("load start");
    return <ObserverAsyncComponent
      render={this.props.component
        ? async () => {
        await waitForMs(3000);
        return React.createElement((await this.props.component).default, props)
        }
        : this.props.render}
      props={props}
      onRenderSuccess={action(()=> {
        this.navStore.pageWideLoadingBarShown = false;
        console.log("load complete")
      })}
    />;
  };

  render() {
    return <Route path={this.props.path}  exact={this.props.exact}
                  render={this.renderRoute}/>;
  }
}
