import React from 'react';
import { Inject } from "react.di";
import { Footer } from "../../components/Footer";
import styled from "styled-components";
import { Layout } from 'antd';
import { UiStore } from "../../stores/UiStore";
import { LanguageSelector } from "../../components/LanguageSelector";
import { LogoItem } from "../../components/Nav/LogoItem";
import { ProductShowcase } from "./ProductShowcase";
import { RouterStore } from "../../stores/RouterStore";
import { FunctionShowcase } from "./FunctionShowcase";
import { FeatureShowcase } from "./FeatureShowcase";

import QueueAnim from 'rc-queue-anim';
// import { enquireScreen } from 'enquire-js';

const AntdHeader = Layout.Header;

// let isMobile;
// enquireScreen((b) => {
//   isMobile = b;
// });

interface State {
  isMobile: boolean;
  show: boolean;
}

interface PaddingProps {
  padding: number;
}

const Header = styled(AntdHeader)`
  padding: 0 ${(props: PaddingProps) => props.padding}px 0 ${(props: PaddingProps) => props.padding}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  
      max-width: 1260px;
  margin-left: auto;
  margin-right: auto;
`;

const HeaderContainer = styled.div`
  & > * {
  margin-left: 16px;
  }
  display: flex;

  
  
`;

const Page = styled.div`
  //max-width: 1200px;
  //margin-left: auto;
  //margin-right: auto;
`;

export const ID_PREFIX = "home.";


// @Module({
//   providers: [
//     HomeStore
//   ]
// })
export default class HomePage extends React.Component<{}, {}> {

  @Inject uiStore: UiStore;
  @Inject routerStore: RouterStore;

  to = () => {
    this.routerStore.jumpTo("/browse");
  };

  // componentDidMount() {
  //   // 适配手机屏幕;
  //   enquireScreen((b) => {
  //     this.setState({isMobile: !!b});
  //   });
  //   // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
  //   if (location.port) {
  //     // 样式 build 时间在 200-300ms 之间;
  //     setTimeout(() => {
  //       this.setState({
  //         show: true,
  //       });
  //     }, 500);
  //   }
  // }

  render() {

    // return <div>
    //   <TopNav dropdownMode={false} routes={}/>
    // </div>

    return <Page>
        <Header padding={16}>
          <HeaderContainer>
            <div>
              <LogoItem textColor={"black"}/>
            </div>
          </HeaderContainer>
          <LanguageSelector/>
        </Header>
        <ProductShowcase to={this.to}/>
        <FunctionShowcase key={"3"}/>
        <FeatureShowcase key={"4"}/>
        <Footer/>
    </Page>
  }
}
