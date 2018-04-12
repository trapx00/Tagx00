import React, { ReactNode } from 'react';
import { Layout} from 'antd';
const { Sider, Content } = Layout;

interface Props {
  sideMenu: ReactNode;
}

export class SidebarLayout extends React.Component<Props, {}> {
  render() {
    return <Layout style={{padding: '12px 0', background: '#fff'}}>
      <Sider width={200} style={{background: '#fff'}}>
        {this.props.sideMenu}
      </Sider>
      <Content style={{minHeight: 280, padding: "0 28px"}}>
        {this.props.children}
      </Content>
    </Layout>;
  }
}
