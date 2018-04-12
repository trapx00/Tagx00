import React from "react";
import { Menu } from 'antd';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { NavSideMenu, NavSideMenuRoute } from "../../components/NavSideMenu";

const { SubMenu } = Menu;



interface Props {
  allowedPaths: string[];
}

const routes: NavSideMenuRoute[] = [
  {
    path: "/mission",
    iconName: "tag-o",
    id: "missions.sideMenu.mission",
    match(pathname: string) {
      return pathname === "/mission" || pathname.startsWith("/mission/create")
    }
  },
  {
    path: "/mission/instance",
    iconName: "tag",
    id: "missions.sideMenu.instance",
    match(pathname: string) {
      return pathname.startsWith("/mission/instance")
    }
  }
];

@observer
export class MissionSideMenu extends React.Component<Props, any> {

  render() {
    return <NavSideMenu routes={routes.filter(x => this.props.allowedPaths.indexOf(x.path) >= 0)}/>
  }

}
