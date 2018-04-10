import React from "react"
import { AsyncRouteConfig, RouteType } from "./RouteConfig";

export const notFoundPage: AsyncRouteConfig = {
  type: RouteType.Async,
  path: "",
  render: async (props) => {
    const NotFoundPage = (await import("../../pages/NotFound")).NotFoundPage;
    return <NotFoundPage/>
  },
  exact: false
};
