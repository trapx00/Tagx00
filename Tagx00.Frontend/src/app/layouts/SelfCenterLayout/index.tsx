import React from "react";
import { Layout, Menu } from 'antd';
import { SelfSideMenu } from "../../components/SelfSideMenu";
import { inject, IReactComponent, observer } from "mobx-react";
import { STORE_USER } from "../../constants/stores";
import { UserStoreProps } from "../../stores/UserStore";

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

interface Props extends UserStoreProps {

}

@inject(STORE_USER)
@observer
export class SelfCenterLayout extends React.Component<Props, any> {
  render() {

    const userStore = this.props[STORE_USER];
    if (userStore.loggedIn) {
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
