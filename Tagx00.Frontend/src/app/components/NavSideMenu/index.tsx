import React from 'react';
import { Menu, Icon } from 'antd';
import { Inject } from "react.di";
import { RouterStore } from "../../stores/RouterStore";
import { UserStore } from "../../stores/UserStore";
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { LocaleMessage } from "../../internationalization/components";

export interface NavSideMenuRoute {
  path: string;
  iconName?: string;
  id: string;
  match(pathname: string): boolean;
}

interface Props {
  routes: NavSideMenuRoute[];
}

@observer
export class NavSideMenu extends React.Component<Props, {}> {

  @Inject routerStore: RouterStore;
  @Inject userStore: UserStore;

  get selectedRoutes() {
    return this.props.routes
      .filter(x => x.match(this.routerStore.path))
      .map(x => x.path);
  }

  render() {
    return <Menu
      mode="inline"
      selectedKeys={this.selectedRoutes}
      style={{ height: '100%' }}
    >
      {this.props.routes.map(x => <Menu.Item key={x.path}>
        <Link to={x.path}>
          <span>{ x.iconName ? <Icon type={x.iconName} /> : null}<LocaleMessage id={x.id}/></span>
        </Link>
      </Menu.Item>)}
    </Menu>
  }
}
