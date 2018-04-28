import React from "react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { SubMenuLayout } from "../SubMenuLayout";
import { requireLogin } from "../../pages/hoc/RequireLogin";
import { UserRole } from "../../models/user/User";

interface Props {
  currentRole?: UserRole;
}


export const routes = [
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

export const adminRoutes = [
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
    path: "/self/topics",
    iconName: "info",
    id: "selfCenter.manageTopics",
    match: (pathname: string) => pathname.startsWith("/self/topics")
  }
];


@observer
@requireLogin()
export class SelfCenterLayout extends React.Component<Props, any> {

  @Inject userStore: UserStore;

  render() {
      return <SubMenuLayout routes={this.props.currentRole === UserRole.ROLE_ADMIN ? adminRoutes : routes}>
        {this.props.children}
      </SubMenuLayout>
    }
}
