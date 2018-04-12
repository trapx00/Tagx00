import React from "react";
import { Menu } from 'antd';
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { Link } from 'react-router-dom';
import { Inject } from "react.di";
import { NavSideMenu } from "../../components/NavSideMenu";

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

  @Inject userStore: UserStore;

  render() {

    return <div>
      <p>welcome, {this.userStore.user.username}</p>
      <NavSideMenu routes={routes}/>
    </div>;
  }

}
