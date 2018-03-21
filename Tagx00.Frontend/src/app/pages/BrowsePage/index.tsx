import React from "react";
import { observer, Provider } from "mobx-react";
import { BrowserStore, STORE_BROWSER } from "../../components/Browser/BrowserStore";
import { SearchBar } from "../../components/Browser/SearchBar";
import { BrowserMissionList } from "../../components/Browser/BrowserMissionList";
import TweenOne from 'rc-tween-one';

@observer
export class BrowsePage extends React.Component<any, any> {
  animation = {paddingTop: '20%', yoyo: true, repeat: -1, duration: 1000};

  render() {
    const store = {
      [STORE_BROWSER]: new BrowserStore()
    };
    return (
      <Provider {...store} >
        <TweenOne animation={this.animation}
                  paused={this.props.paused}
                  style={{height: '-20%'}}
                  className="code-box-shape">
          <SearchBar/>
          <BrowserMissionList/>
        </TweenOne>
      </Provider>
    )
  }
}
