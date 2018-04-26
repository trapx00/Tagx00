import React from 'react';
import { Inject } from "react.di";
import { Menu, Icon } from 'antd';
import { RouterStore } from "../../stores/RouterStore";
import { NavItemProps, NavStore } from "../../stores/NavStore";
import { Link } from 'react-router-dom';
import { dropdownMenuStyle, horizontalMenuStyle } from "./Layout";
import { LocaleMessage } from "../../internationalization/components";

interface Props {
  
}

export class TopNav extends React.PureComponent<{ dropdownMode: boolean, routes: NavItemProps[] }> {

  @Inject routerStore: RouterStore;
  @Inject navStore: NavStore;

  get selectedRoute() {
    return this.props.routes.filter(x => x.match(this.routerStore.path)).map(x => x.path)
  }

  render() {
    const {routes} = this.props;
    return <Menu
      theme="light"
      mode={this.props.dropdownMode ? "inline" : "horizontal"}
      selectedKeys={this.selectedRoute}
      style={this.props.dropdownMode ? dropdownMenuStyle : horizontalMenuStyle}
    >
      {routes.map(x => (
        <Menu.Item key={x.path}>
          <Link to={x.path}>
           <span>
              <Icon type={x.iconName}/>
              <LocaleMessage id={x.id}/>
           </span>
          </Link>
        </Menu.Item>

      ))}
    </Menu>
  }
}
