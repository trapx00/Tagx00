import React from "react";
import { observer } from "mobx-react";
import { BrowserStore } from "../../components/Browser/BrowserStore";
import { SearchBar } from "../../components/Browser/SearchBar";
import { BrowserMissionList } from "../../components/Browser/BrowserMissionList";
import { Layout } from "antd";
import TweenOne from 'rc-tween-one';
import { Inject, Module } from "react.di";
import { SvgImg } from "../../components/Common/SvgImg";
import ReactDOM from "react-dom";

const {Content} = Layout;

const standardBarMoveTop: number = -26;
const standardLogoMoveTop: number = -13;
const standardLogoMoveLeft = "-85%";

@Module({
  providers: [
    BrowserStore
  ]
})
@observer
export class BrowsePage extends React.Component<any, any> {

  @Inject browserStore: BrowserStore;
  private searchBar: React.RefObject<any>;

  constructor(props: any, context: any) {
    super(props, context);
    this.searchBar = React.createRef();
  }

  handleResize = () => {
    this.browserStore.searchBarWidth = -parseInt(getComputedStyle(ReactDOM.findDOMNode(this.searchBar.current) as Element, null).width)*0.86;
    this.browserStore.resizeMoveRate();
  };

  render() {
    window.onload = this.handleResize;
    window.onresize = this.handleResize;
    const barMoveTop = standardBarMoveTop / this.browserStore.moveHeightRate;
    const logoMoveTop = standardLogoMoveTop / this.browserStore.moveHeightRate;
    const logoMoveLeft = this.browserStore.searchBarWidth;
    const contentAnimation = [
      {scale: 1},
      {scale: 1},
      {marginTop: barMoveTop + '%'},
    ];
    const logoAnimation = [
      {scale: 0.6},
      {marginLeft: logoMoveLeft.toString()},
      {scale: 0.3, marginTop: logoMoveTop + '%'}
    ];
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
          <SearchBar ref={this.searchBar}/>
          <Content>
            <BrowserMissionList/>
          </Content>
        </TweenOne>
      </div>

    )
  }
}
