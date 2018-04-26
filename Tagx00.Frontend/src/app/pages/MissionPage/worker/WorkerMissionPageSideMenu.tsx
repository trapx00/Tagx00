import React from 'react';
import { NavSideMenu, NavSideMenuRoute } from "../../../components/NavSideMenu";

const routes: NavSideMenuRoute[] = [
  {
    path: "/mission/worker",
    iconName: "tag-o",
    id: "missions.sideMenu.mission",
    match(pathname: string) {
      return pathname.startsWith("/mission/worker")
    }
  },
];

interface Props {

}

export class WorkerMissionPageSideMenu extends React.Component<Props, {}> {
  render() {
    return <NavSideMenu routes={routes}/>
  }
}
