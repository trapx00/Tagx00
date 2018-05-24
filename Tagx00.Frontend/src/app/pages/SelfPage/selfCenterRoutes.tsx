import React from "react";
import { AsyncRouteConfig, RedirectRouteConfig, RouteType } from "../../router/RouteConfig";

export const dashboardPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/dashboard",
  component: import("./dashboard")
};

export const achievementPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/achievement",
  component: import("./AchievementPage")
};

export const personalInfoPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/personalInfo",
  component: import("./personalInfo")
};

export const manageTopicsPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/topics",
  component: import("./topic/TopicsManagementPage")
};

export const selfRedirect: RedirectRouteConfig = {
  type: RouteType.Redirect,
  exact: true,
  path: "/self",
  to: "/self/dashboard"
};

export default [
  selfRedirect,
  dashboardPage,
  achievementPage,
  personalInfoPage,
  manageTopicsPage,
]
