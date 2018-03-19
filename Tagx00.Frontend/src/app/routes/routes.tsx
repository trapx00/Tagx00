import { RouteComponentProps } from "react-router";
import React from "react";
import { BaseLayout } from "../layouts/BaseLayout";

export interface RouteConfig {
  id: string;
  useBaseLayout: boolean;
  isThisPage: (pathname: string) => boolean;
  path: string;
  render: (props: RouteComponentProps<any>) => Promise<JSX.Element>;
  exact: boolean;
}

export const homePage: RouteConfig = {
  id: "Home",
  path: "/",
  useBaseLayout: false,
  render: async (props) => {
    const HomePage = (await import("../pages/HomePage")).HomePage;
    return <HomePage/>;
  },
  isThisPage: (pathname: string) => {
    return pathname === '/';
  },
  exact: true
};

export const browsePage: RouteConfig = {
  id: "Browse",
  path: "/browse",
  useBaseLayout: true,
  render: async (props) => {
    const BrowsePage = (await import("../pages/BrowsePage")).BrowsePage;
    return <BrowsePage/>;
  },
  isThisPage: (pathname: string) => {
    return pathname === "/browse";
  },
  exact: true
};

export const registerPage: RouteConfig = {
  id: "Register",
  path: "/register",
  useBaseLayout: true,
  render: async (props) => {
    const RegisterPage = (await import("../pages/Register")).RegisterPage;
    return <RegisterPage/>;
  },
  isThisPage: (pathname: string) => {
    return pathname === "/register";
  },
  exact: true
};

export const aboutPage: RouteConfig = {
  id: "About",
  path: "/about",
  useBaseLayout: true,
  render: async (props) => {
    const AboutPage = (await import("../pages/AboutPage")).AboutPage;
    return <AboutPage/>;
  },
  isThisPage: (pathname: string) => {
    return pathname === "/about";
  },
  exact: true
};

export const notFoundPage: RouteConfig = {
  id: "NotFound",
  path: "",
  useBaseLayout: true,
  isThisPage: (pathname: string) => true,
  render: async (props) => {
    const NotFoundPage = (await import("../pages/NotFound")).NotFoundPage;
    return <NotFoundPage/>
  },
  exact: false
};


export default [
  homePage,
  browsePage,
  aboutPage,
  registerPage,
  notFoundPage
]
