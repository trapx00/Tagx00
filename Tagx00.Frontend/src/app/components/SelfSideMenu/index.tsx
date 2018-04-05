import React from "react";
import { Menu, Icon } from 'antd';
import { inject, observer } from "mobx-react";
import { STORE_ROUTER, STORE_USER } from "../../constants/stores";
import { UserStore } from "../../stores/UserStore";
import { Link } from 'react-router-dom';
import { RouterStore } from "../../router/RouterStore";
import { LocaleMessage } from "../../internationalization/components";
import { Inject } from "react.di";
const { SubMenu } = Menu;

interface Props {

}

const routes = [
  {
    path: "/self/dashboard",
    iconName: "dashboard",
    id: "selfCenter.dashboard",
    match: (pathname: string) => pathname.startsWith("/self/dashboard")
  },
  {
    path: "/self/achievement",
    iconName: "star-o",
    id: "selfCenter.achievement",
    match: (pathname: string) => pathname.startsWith("/self/achievement")
  },
  {
    path: "/self/personalInfo",
    iconName: "info",
    id: "selfCenter.personalInfo",
    match: (pathname: string) => pathname.startsWith("/self/personalInfo")
  }
];

@observer
export class SelfSideMenu extends React.Component<Props, any> {


  @Inject routerStore: RouterStore;
  @Inject userStore: UserStore;

  get selectedRoutes() {
    return routes.filter(x => x.match(this.routerStore.path)).map(x => x.path);
  }

  render() {

    return <div>
      <p>welcome, {this.userStore.user.username}</p>
    <Menu
      mode="inline"
      selectedKeys={this.selectedRoutes}
      style={{ height: '100%' }}
    >
      {routes.map(x => <Menu.Item key={x.path}>
        <Link to={x.path}>
          <span><Icon type={x.iconName} /><LocaleMessage id={x.id}/></span>
        </Link>
      </Menu.Item>)}
    </Menu>
    </div>;
  }

}
