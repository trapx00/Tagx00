import React from "react";
import { Layout, Menu } from 'antd';
import { SelfSideMenu } from "../../components/SelfSideMenu";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

interface Props {

}

@observer
export class SelfCenterLayout extends React.Component<Props, any> {

  @Inject userStore: UserStore;

  render() {

    if (this.userStore.loggedIn) {
      return <Layout style={{padding: '12px 0', background: '#fff'}}>
        <Sider width={200} style={{background: '#fff'}}>
          <SelfSideMenu/>
        </Sider>
        <Content style={{minHeight: 280, padding: "0 28px"}}>
          {this.props.children}
        </Content>
      </Layout>;
    } else {
      return "log in first."
    }

  }
}
