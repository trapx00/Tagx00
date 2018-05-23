import React from "react";
import { Layout, Menu } from 'antd';
import { SelfCenterLayout } from "../../layouts/SelfCenterLayout";
import routes from './selfCenterRoutes';
import { constructRoute } from "../../router/RouteConfig";
import { Switch } from "react-router";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class SelfPage extends React.Component<any, any> {
  render() {
    return <SelfCenterLayout>
      <Switch>
      {routes.map(constructRoute)}
      </Switch>
    </SelfCenterLayout>;
  }
}

