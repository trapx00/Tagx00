import React from "react";
import { Layout } from 'antd';
import { Footer } from "../../components/Footer";
import { MainNav } from "../../components/Nav/MainNav";
import { Inject } from "react.di";
import { CONTENT_SIDE_PADDING, UiStore } from "../../stores/UiStore";
import { MainHeader } from "../../components/Nav/MainHeader";
import { observer } from "mobx-react";
import { NavStore } from "../../stores/NavStore";
import { PageWideLoadingBar } from "../../components/PageWideLoadingBar";
import { LoadingBarContainer } from "./LoadingBarContainer";
import { action } from "mobx";

const {Header, Content, Sider} = Layout;

export class BaseLayout extends React.Component<{}, {}> {


  render() {
    return <Layout style={{position :"relative"}}>
      <LoadingBarContainer/>
      <MainNav/>
      <Layout>
        <MainHeader/>
        <Content style={{padding: `${CONTENT_SIDE_PADDING}px ${CONTENT_SIDE_PADDING}px`}}>
          <div style={{background: '#fff', padding: `16px`, minHeight: 280}}>
            {this.props.children}
          </div>
        </Content>
        <Footer/>
      </Layout>
    </Layout>

    // return <Layout className="layout">
    //   <Header style={{backgroundColor: "white"}}>
    //     <Navbar/>
    //   </Header>
    //   <Content style={{padding: '16px 16px'}}>
    //     <div style={{background: '#fff', padding: 16, minHeight: 280}}>
    //       {this.props.children}
    //     </div>
    //   </Content>
    //   <Footer/>
    // </Layout>;
  }
}
