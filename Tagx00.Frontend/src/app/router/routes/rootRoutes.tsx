import React from "react";
import { NormalPageConfig, RouteConfig } from "./RouteConfig";


export const doWorkPage: RouteConfig = new NormalPageConfig({
  path: "/missions/:missionId/doWork",
  render: async (props) => {
    const DoWorkPage = (await import("../../pages/DoWorkPage")).DoWorkPage;
    return <DoWorkPage missionId={props.match.params.missionId}/>;
  },
});

export const homePage: RouteConfig = new NormalPageConfig({
  path: "/",
  render: async (props) => {
    const HomePage = (await import("../../pages/HomePage")).HomePage;
    return <HomePage/>;
  },
});

export const browsePage: RouteConfig = new NormalPageConfig({
  path: "/browse",
  render: async (props) => {
    const BrowsePage = (await import("../../pages/BrowsePage")).BrowsePage;
    return <BrowsePage/>;
  },
});

export const registerPage: RouteConfig = new NormalPageConfig( {
  path: "/register",
  render: async (props) => {
    const RegisterPage = (await import("../../pages/Register")).RegisterPage;
    return <RegisterPage/>;
  },
});

export const aboutPage: RouteConfig = new NormalPageConfig({
  path: "/about",
  render: async (props) => {
    const AboutPage = (await import("../../pages/AboutPage")).AboutPage;
    return <AboutPage/>;
  },
});





export default [
  doWorkPage,
  browsePage,
  registerPage,
  aboutPage
]
