import React from "react";
import { Layout } from 'antd';
import { Footer } from "../../components/Footer";
import { MainNav } from "../../components/Nav/MainNav";
import { Inject } from "react.di";
import { UiStore } from "../../stores/UiStore";
import { MainHeader } from "../../components/Nav/MainHeader";
import { observer } from "mobx-react";
import { NavStore } from "../../stores/NavStore";

const {Header, Content, Sider} = Layout;

@observer
export class BaseLayout extends React.Component<{}, {}> {

  @Inject uiStore: UiStore;
  @Inject navStore: NavStore;

  render() {
    const padding = this.uiStore.contentSidePadding;
    return <Layout className="layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={!this.navStore.navMenuShown}
      >
        <MainNav/>
      </Sider>
      <Layout>
        <MainHeader/>
        <Content style={{padding: `${padding}px ${padding}px`}}>
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
