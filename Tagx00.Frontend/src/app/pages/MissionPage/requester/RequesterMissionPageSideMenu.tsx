import React from 'react';
import { NavSideMenu, NavSideMenuRoute } from "../../../components/NavSideMenu";

const routes: NavSideMenuRoute[] = [
  {
    path: "/mission/requester",
    iconName: "tag-o",
    id: "missions.sideMenu.mission",
    match(pathname: string) {
      return pathname === "/mission/requester" || pathname.startsWith("/mission/requester/create")
    }
  },
  {
    path: "/mission/requester/instance",
    iconName: "tag",
    id: "missions.sideMenu.instance",
    match(pathname: string) {
      return pathname.startsWith("/mission/requester/instance")
    }
  }
];

interface Props {

}

export class RequesterMissionPageSideMenu extends React.Component<Props, {}> {
  render() {
    return <NavSideMenu routes={routes}/>
  }
}
