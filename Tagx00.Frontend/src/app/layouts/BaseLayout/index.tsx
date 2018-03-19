import * as React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
const { Header, Content } = Layout;

export class BaseLayout extends React.Component<any, any> {

  render() {
    return <Layout className="layout">
      <Header>
        <Navbar/>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {this.props.children}
        </div>
      </Content>
      <Footer/>
    </Layout>;
  }
}

