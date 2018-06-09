import React from "react";
import { observer } from "mobx-react";
import { Layout } from "antd";
import TweenOne from 'rc-tween-one';
import { Inject } from "react.di";
import { BrowserStore } from "../../stores/BrowserStore";
import { SvgImg } from "../../components/Common/SvgImg";
import { SearchBar } from "./SearchBar";
import { BrowserMissionList } from "./BrowserMissionList";
import styled from "styled-components";

const {Content} = Layout;

const Container = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

@observer
export class BrowserAnimatedContent extends React.Component<any, any> {

  @Inject browserStore: BrowserStore;

  render() {
    const contentAnimation = [
      {marginTop: this.browserStore.moveHeight}
    ];
    const logoAnimation = [
      {scale: 0}
    ];
    return <Container >
      {!this.browserStore.isStop ? (
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
    ) : (<div>
      <TweenOne animation={null}
                paused={true}
                reverse={true}
                className="code-box-shape">
        <div style={{textAlign: 'center', marginBottom: '-10%', marginTop: '5%'}}>
          <SvgImg filePath={"tag_x00_logo.svg"} height={0} width={0}/>
        </div>
      </TweenOne>
      <TweenOne animation={null}
                paused={true}
                reverse={true}
                className="code-box-shape" style={{marginTop: this.browserStore.moveHeight / 4}}>
        <SearchBar/>
        <Content>
          <BrowserMissionList/>
        </Content>
      </TweenOne>
    </div>)}</Container>
  }
}
