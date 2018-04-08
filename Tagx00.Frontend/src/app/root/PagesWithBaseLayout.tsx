import React from "react";
import { BaseLayout } from "../layouts/BaseLayout";
import { Switch } from "react-router";
import { History } from "history";
import rootRoutes from "../router/routes/rootRoutes";
import { PagesWithSelfCenterLayout } from "./PagesWithSelfCenterLayout";
import { notFoundPage } from "../router/routes/notFoundRoute";
import { constructRoute } from "../router/routes/RouteConfig";

interface Props {
  history: History;
}

export class PageWithBaseLayout extends React.Component<Props, any> {
  render() {
    return <BaseLayout>
        <Switch>
          {rootRoutes.map(constructRoute)}
          <PagesWithSelfCenterLayout history={this.props.history}/>
          {constructRoute(notFoundPage)}
        </Switch>
    </BaseLayout>;
  }
}
