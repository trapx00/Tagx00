import React from "react";
import { AsyncRouteConfig, RedirectRouteConfig, RouteType } from "./RouteConfig";

export const dashboardPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/dashboard",
  render: async (props) => {
    const Page = (await import("../../pages/SelfPage/DashboardPage")).DashboardPage;
    return <Page/>;
  },
};

export const achievementPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/achievement",
  render: async (props) => {
    const Page = (await import("../../pages/SelfPage/AchievementPage")).AchievementPage;
    return <Page/>;
  },
};

export const personalInfoPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/personalInfo",
  render: async (props) => {
    const Page = (await import("../../pages/SelfPage/PersonalInfoPage")).PersonalInfoPage;
    return <Page/>;
  },
};


export const selfRedirect: RedirectRouteConfig = {
  type: RouteType.Redirect,
  exact: true,
  path: "/self",
  to: "/self/dashboard"
};

export default [
  dashboardPage,
  achievementPage,
  personalInfoPage,
  selfRedirect,
]
