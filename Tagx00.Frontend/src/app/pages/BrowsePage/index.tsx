import React from "react";
import { Motion, spring } from 'react-motion';
import { observer, Provider } from "mobx-react";
import { BrowserStore, STORE_BROWSER } from "../../components/Browser/BrowserStore";
import { observable } from "mobx";
import { SearchBar } from "../../components/Browser/SearchBar";
import { BrowserMissionList } from "../../components/Browser/BrowserMissionList";


@observer
export class BrowsePage extends React.Component<any, any> {

  render() {
    const store = {
      [STORE_BROWSER]: new BrowserStore()
    };
    return (
      <Provider {...store} >
        <div>
          Browser
        {/*<Motion style={{x: spring(store[STORE_BROWSER] ? -200 : 0)}}>{*/}
          {/*({x}) => {*/}
            {/*const fillContent = {*/}
              {/*transform: `translate3d(0, ${x}px, 0)`*/}
            {/*};*/}
            {/*return  <div style={fillContent}>*/}
              {/*<SearchBar/>*/}
              {/*<BrowserMissionList/>*/}
            {/*</div>*/}
          {/*}*/}

        {/*}</Motion>*/}
        </div>
      </Provider>
    )
  }
}
