import React from "react";
import { observer, Provider } from "mobx-react";
import { BrowserStore, STORE_BROWSER } from "../../components/Browser/BrowserStore";
import { SearchBar } from "../../components/Browser/SearchBar";
import { BrowserMissionList } from "../../components/Browser/BrowserMissionList";
import TweenOne from 'rc-tween-one';

@observer
export class BrowsePage extends React.Component<any, any> {
  contentAnimation = [
    {scale: 1},
    {scale: 1},
    {marginTop: '-31%'},
  ];
  logoAnimation = [
    {scale: 0.6},
    {marginLeft: '-85%'},
    {scale: 0.3, marginTop: '-13%'}
  ];
  store = {
    [STORE_BROWSER]: new BrowserStore()
  };

  render() {
    return (
      <Provider {...this.store} >
        <div>
          <TweenOne animation={this.logoAnimation}
                    paused={this.store[STORE_BROWSER].paused}
                    reverse={this.store[STORE_BROWSER].reverse}
                    className="code-box-shape">
            <div style={{textAlign: 'center', marginBottom: '-10%', marginTop: '5%'}}>
              <img id="logo" src={require('../../../assets/logo.png')}
                   alt="" style={{width: '20%'}}/>
            </div>
          </TweenOne>
          <TweenOne animation={this.contentAnimation}
                    paused={this.store[STORE_BROWSER].paused}
                    reverse={this.store[STORE_BROWSER].reverse}
                    className="code-box-shape">
            <SearchBar/>
            <BrowserMissionList/>
          </TweenOne>
        </div>
      </Provider>
    )
  }
}
