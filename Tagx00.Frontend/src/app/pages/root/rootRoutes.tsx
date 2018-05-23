import React from "react";
import { AsyncRouteConfig, RouteType } from "../../router/RouteConfig";

export const missionPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: false,
  path: "/mission",
  component: import("../MissionPage")
};

export const leaderboardPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: false,
  path: "/leaderboard",
  component: import("../LeaderboardPage")
};

export const browsePage: AsyncRouteConfig  = {
  type: RouteType.Async,
  exact: true,
  path: "/browse",
  component: import("../BrowsePage")
};

export const registerPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/register",
  component: import("../../pages/RegisterPage")
};

export const aboutPage:AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/about",
  component: import("../AboutPage")
};

export const selfCenterPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: false,
  path: "/self",
  component: import("../SelfPage")
};

export const payPage: AsyncRouteConfig  = {
  type: RouteType.Async,
  exact: false,
  path: "/pay",
  component: import("../PayPage")
};





export default [
  missionPage,
  browsePage,
  leaderboardPage,
  registerPage,
  aboutPage,
  payPage,
  selfCenterPage
]
