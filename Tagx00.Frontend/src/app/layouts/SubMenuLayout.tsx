import React, { ReactNode } from 'react';
import { Layout} from 'antd';
import { Inject } from "react.di";
import { NavItemProps, NavStore } from "../stores/NavStore";
import { action } from "mobx";
const { Sider, Content } = Layout;

interface Props {
  routes: NavItemProps[];
}

export class SubMenuLayout extends React.Component<Props, {}> {



  @Inject navStore: NavStore;

  @action componentDidMount() {
    this.navStore.currentSubNavs = this.props.routes;
  }

  render() {
    return this.props.children;
  }
}
