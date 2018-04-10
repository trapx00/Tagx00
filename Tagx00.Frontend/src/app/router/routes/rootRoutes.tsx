import React from "react";
import { AsyncRouteConfig, RouteType } from "./RouteConfig";


export const doWorkPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/missions/:missionId/doWork",
  render: async (props) => {
    const DoWorkPage = (await import("../../pages/DoWorkPage")).DoWorkPage;
    return <DoWorkPage missionId={props.match.params.missionId} readonly={false}/>;
  },
};

export const seeResultPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/missions/:missionId/result",
  render: async (props) => {
    const Page = (await import("../../pages/SeeResultPage")).SeeResultPage;
    return <Page missionId={props.match.params.missionId}/>;
  },
};

export const missionsPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/missions",
  render: async (props) => {
    const Page = (await import("../../pages/MissionsPage")).MissionsPage;
    return <Page/>;
  },
};

export const homePage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/",
  render: async (props) => {
    const HomePage = (await import("../../pages/HomePage")).HomePage;
    return <HomePage/>;
  },
};

export const browsePage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/browse",
  render: async (props) => {
    const BrowsePage = (await import("../../pages/BrowsePage")).BrowsePage;
    return <BrowsePage/>;
  },
};

export const registerPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/register",
  render: async (props) => {
    const RegisterPage = (await import("../../pages/RegisterPage")).RegisterPage;
    return <RegisterPage/>;
  },
};

export const aboutPage: AsyncRouteConfig = {
  type: RouteType.Async,
  exact: true,
  path: "/about",
  render: async (props) => {
    const AboutPage = (await import("../../pages/AboutPage")).AboutPage;
    return <AboutPage/>;
  },
};


export default [
  missionsPage,
  seeResultPage,
  doWorkPage,
  browsePage,
  registerPage,
  aboutPage
]
