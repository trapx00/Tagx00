import React from "react";
import { NormalPageConfig, RouteConfig } from "./RouteConfig";

export const homePage: RouteConfig = new NormalPageConfig({
  path: "/",
  render: async (props) => {
    const HomePage = (await import("../../pages/HomePage")).HomePage;
    return <HomePage/>;
  },
  identify: (pathname) => {
    return pathname === "/";
  },
});

export const browsePage: RouteConfig = new NormalPageConfig({
  path: "/browse",
  render: async (props) => {
    const BrowsePage = (await import("../../pages/BrowsePage")).BrowsePage;
    return <BrowsePage/>;
  },
  identify: (pathname) => {
    return pathname.startsWith("/browse");
  },
});

export const registerPage: RouteConfig = new NormalPageConfig( {
  path: "/register",
  render: async (props) => {
    const RegisterPage = (await import("../../pages/Register")).RegisterPage;
    return <RegisterPage/>;
  },
  identify: (pathname) => {
    return pathname.startsWith("/register");
  },
});

export const aboutPage: RouteConfig = new NormalPageConfig({
  path: "/about",
  render: async (props) => {
    const AboutPage = (await import("../../pages/AboutPage")).AboutPage;
    return <AboutPage/>;
  },
  identify: (pathname) => {
    return pathname.startsWith("/about");
  },
});



export default [
  homePage, browsePage, registerPage, aboutPage
]
