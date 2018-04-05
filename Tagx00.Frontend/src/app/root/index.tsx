import createBrowserHistory from "history/createBrowserHistory";
import { Module } from "react.di";
import * as React from "react";
import { Root } from "./root";
import { initProviders } from "../providers/index";


export interface AppProps {

}

export async function App() {
  const history = createBrowserHistory();
  const providers = await initProviders(history);
  return Module({
    providers: providers
  })(
  class App extends React.Component<AppProps, {}> {
    render() {
      return <Root history={history}/>
    }
  });
}
