import React from "react";
import { Layout } from 'antd';
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

const {Header, Content} = Layout;

export class BaseLayout extends React.Component<{}, {}> {

  render() {
    return <Layout className="layout">
      <Header style={{backgroundColor: "white"}}>
        <Navbar/>
      </Header>
      <Content style={{padding: '16px 16px'}}>
        <div style={{background: '#fff', padding: 16, minHeight: 280}}>
          {this.props.children}
        </div>
      </Content>
      <Footer/>
    </Layout>;
  }
}
