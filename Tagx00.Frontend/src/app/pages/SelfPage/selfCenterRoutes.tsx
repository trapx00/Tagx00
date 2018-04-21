import React from "react";
import { AsyncRouteConfig, RedirectRouteConfig, RouteType } from "../../router/RouteConfig";
import { asyncAction } from "mobx-utils";

export const dashboardPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/dashboard",
  render: async (props) => {
    const Page = (await import("./dashboard/index")).DashboardPage;
    return <Page/>;
  },
};

export const achievementPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/achievement",
  render: async (props) => {
    const Page = (await import("./AchievementPage")).AchievementPage;
    return <Page/>;
  },
};

export const personalInfoPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/personalInfo",
  render: async (props) => {
    const Page = (await import("./personalInfo/index")).PersonalInfoPage;
    return <Page/>;
  },
};

export const requesterCreditBoardPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/self/leaderboard/requester",
  render: async (props) => {
    const Page = (await import("./leaderboard/RequesterCreditBoardPage")).RequesterCreditBoardPage;
    return <Page/>;
  },
};

export const workerCreditBoardPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path:"/self/leaderboard/worker/credits",
  render: async(props) => {
    const Page = (await import("./leaderboard/WorkerCreditBoardPage")).WorkerCreditBoardPage;
    return <Page/>;
  },
};

export const workerExpBoardPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path:"/self/leaderboard/worker/exp",
  render: async(props) => {
    const Page = (await import("./leaderboard/WorkerExpBoardPage")).WorkerExpBoardPage;
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
  selfRedirect,
  dashboardPage,
  achievementPage,
  requesterCreditBoardPage,
  workerCreditBoardPage,
  workerExpBoardPage,
  personalInfoPage,
]
