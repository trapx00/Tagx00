import React from "react";
import { observer } from "mobx-react";
import { BrowserStore } from "../../components/Browser/BrowserStore";
import { SearchBar } from "../../components/Browser/SearchBar";
import { BrowserMissionList } from "../../components/Browser/BrowserMissionList";
import { Layout } from "antd";
import TweenOne from 'rc-tween-one';
import { Inject, Module } from "react.di";
import { SvgImg } from "../../components/Common/SvgImg";

const {Content} = Layout;


const contentAnimation = [
  {scale: 1},
  {scale: 1},
  {marginTop: '-31%'},
];
const logoAnimation = [
  {scale: 0.6},
  {marginLeft: '-85%'},
  {scale: 0.3, marginTop: '-13%'}
];

@Module({
  providers: [
    BrowserStore
  ]
})
@observer
export class BrowsePage extends React.Component<any, any> {

  @Inject browserStore: BrowserStore;

  render() {
    return (
        <div>
          <TweenOne animation={logoAnimation}
                    paused={this.browserStore.paused}
                    reverse={this.browserStore.reverse}
                    className="code-box-shape">
            <div style={{textAlign: 'center', marginBottom: '-10%', marginTop: '5%'}}>
              <SvgImg filePath={"tag_x00_logo.svg"} height={200} width={200}/>
            </div>
          </TweenOne>
          <TweenOne animation={contentAnimation}
                    paused={this.browserStore.paused}
                    reverse={this.browserStore.reverse}
                    className="code-box-shape">
            <SearchBar/>
            <Content>
              <BrowserMissionList/>
            </Content>
          </TweenOne>
        </div>

    )
  }
}
