import { RouteComponentProps } from "react-router";
import React from "react";
import { BaseLayout } from "../layouts/BaseLayout";

export interface RouteConfig {
  useBaseLayout: boolean;
  isThisPage: (pathname: string) => boolean;
  path: string;
  render: (props: RouteComponentProps<any>) => Promise<JSX.Element>;
  exact: boolean;
}

export const homePage: RouteConfig = {
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

export const startPage: RouteConfig = {
  path: "/start",
  useBaseLayout: true,
  render: async (props) => {
    const StartPage = (await import("../pages/StartPage")).StartPage;
    return <StartPage/>;
  },
  isThisPage: (pathname: string) => {
    return pathname === "/start";
  },
  exact: true
};

export const registerPage: RouteConfig = {
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

export const notFoundPage: RouteConfig = {
  path: "/register",
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
  startPage,
  registerPage,
  notFoundPage
]
