import React, { ReactNode } from 'react';
import { Layout} from 'antd';
const { Sider, Content } = Layout;

interface Props {
  leftSider?: ReactNode;
  leftSiderWidth?: number;
  rightSider?: ReactNode;
  rightSiderWidth?: number;
}

export class SiderLayout extends React.Component<Props, {}> {
  render() {
    return <Layout style={{padding: '12px 0', background: '#fff'}}>
      { this.props.leftSider
      ? <Sider width={this.props.leftSiderWidth || 200} style={{background: '#fff'}}>
        {this.props.leftSider}
      </Sider> : null }
      <Content style={{minHeight: 280, padding: "0 28px"}}>
        {this.props.children}
      </Content>
      { this.props.rightSider
        ? <Sider width={this.props.rightSiderWidth || 200} style={{background: '#fff'}}>
          {this.props.rightSider}
        </Sider> : null }
    </Layout>;
  }
}
