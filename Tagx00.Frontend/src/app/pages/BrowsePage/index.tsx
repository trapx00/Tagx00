import React from "react";
import { observer, Provider } from "mobx-react";
import { BrowserStore, STORE_BROWSER } from "../../components/Browser/BrowserStore";
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
        <img id="logo" src={require('../../../assets/logo.png')}
                             alt="" style={{padding: '5%',textAlign:'center',height:'20px'}}/>
          <SearchBar/>
          <BrowserMissionList/>
        </div>
      </Provider>
    )
  }
}
