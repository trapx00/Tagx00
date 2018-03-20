import * as React from "react";
import { SearchBar } from "../../components/Browser/SearchBar";
import { BrowserMissionList } from "../../components/Browser/BrowserMissionList";
import { UseBaseLayout } from "../../layouts/BaseLayout";
import { Motion, spring } from 'react-motion';
import { Provider } from "mobx-react";
import { BrowserStore, STORE_BROWSER } from "../../components/Browser/BrowserStore";
import { observable } from "mobx";

const fillContent = {
  WebkitTransform: 'translate3d(0, ${x}px, 0)',
  transform: 'translate3d(0, ${x}px, 0)'
};

@observable
@UseBaseLayout
export class BrowsePage extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  };

  render() {
    const store = {
      [STORE_BROWSER]: new BrowserStore()
    };
    return (
      <Provider {...store} >
        <Motion style={{x: spring(store[STORE_BROWSER] ? -200 : 0)}}>{
          ({x}) =>
            <div style={fillContent}>
              <SearchBar/>
              <BrowserMissionList/>
            </div>
        }</Motion>
      </Provider>
    )
  }
}
