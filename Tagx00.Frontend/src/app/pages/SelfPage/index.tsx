import React from "react";
import { Layout, Menu } from 'antd';
import { SelfCenterLayout } from "../../layouts/SelfCenterLayout";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export class SelfPage extends React.Component<any, any> {
  render() {
    return <SelfCenterLayout>
      {this.props.children}
    </SelfCenterLayout>;
  }
}

