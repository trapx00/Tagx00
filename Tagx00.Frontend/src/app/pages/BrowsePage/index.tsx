import React from "react";
import { observer, Provider } from "mobx-react";
import { BrowserStore, STORE_BROWSER } from "../../components/Browser/BrowserStore";
import { SearchBar } from "../../components/Browser/SearchBar";
import { BrowserMissionList } from "../../components/Browser/BrowserMissionList";



export class BrowsePage extends React.Component<any, any> {

  render() {
    const store = {
      [STORE_BROWSER]: new BrowserStore()
    };
    return (
      <Provider {...store} >
        <div>
          <SearchBar/>
          <BrowserMissionList/>
        </div>
      </Provider>
    )
  }
}
