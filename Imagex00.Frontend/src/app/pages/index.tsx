import * as React from 'react';
import { RouteComponentProps } from "react-router";

export interface PageConfig {
  isThisPage :(pathname: string) => boolean;
  path: string,
  render: (props: RouteComponentProps<any>) => Promise<JSX.Element>,
  exact: boolean
}


export const notFoundPageConfig: PageConfig =  {
  path: "",
  isThisPage: (pathname: string) => true,
  render: async (props) => {
    const NotFoundPage = (await import("./NotFound")).NotFoundPage;
    return <NotFoundPage/>;
  },
  exact: false
};


export const homePageConfig: PageConfig = {
  path: "/",
  render: async (props) => {
    const HomePage = (await import("./Home")).HomePage;
    return <HomePage/>;
  },
  isThisPage: (pathname: string) => {
    return pathname === '/';
  },
  exact: true
};

export const pageConfigs: PageConfig[] = [
  homePageConfig,
  notFoundPageConfig
];

export function getPage(pathname: string) {
  for (const p of pageConfigs) {
    if (p.isThisPage(pathname)) {
      return p;
    }
  }
  return notFoundPageConfig;
}
