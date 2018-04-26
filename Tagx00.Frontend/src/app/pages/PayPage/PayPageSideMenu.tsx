import React from 'react';
import { NavSideMenu, NavSideMenuRoute } from "../../components/NavSideMenu";

interface Props {

}

const ID_PREFIX = "pay.";

const routes: NavSideMenuRoute[] = [
  {
    path: "/pay/account",
    iconName: "credit-card",
    id: ID_PREFIX + "payAccount",
    match: (pathname: string) => pathname.startsWith("/pay/account")
  },
  {
    path: "/pay/mission",
    iconName: "tag-o",
    id: ID_PREFIX + "payMission",
    match: (pathname: string) => pathname.startsWith("/pay/mission")
  }
];



export class PayPageSideMenu extends React.Component<Props, {}> {
  render() {
    return <NavSideMenu routes={routes}/>
  }
}
