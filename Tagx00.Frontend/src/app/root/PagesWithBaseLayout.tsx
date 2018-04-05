import React from "react";
import { BaseLayout } from "../layouts/BaseLayout";
import { Switch } from "react-router";
import { History } from "history";
import rootRoutes from "../router/routes/rootRoutes";
import { PagesWithSelfCenterLayout } from "./PagesWithSelfCenterLayout";
import { notFoundPage } from "../router/routes/notFoundRoute";

interface Props {
  history: History;
}

export class PageWithBaseLayout extends React.Component<Props, any> {
  render() {
    return <BaseLayout>
        <Switch>
          {rootRoutes.map(x => x.construct())}
          <PagesWithSelfCenterLayout history={this.props.history}/>
          {notFoundPage.construct()}
        </Switch>
    </BaseLayout>;
  }
}
