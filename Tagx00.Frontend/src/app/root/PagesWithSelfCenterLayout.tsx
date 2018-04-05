import React from "react";
import { Switch } from "react-router";
import { History } from "history";
import { SelfCenterLayout } from "../layouts/SelfCenterLayout";
import selfCenterRoutes from "../router/routes/selfCenterRoutes";

interface Props {
  history: History;
}

export class PagesWithSelfCenterLayout extends React.Component<Props, any> {
  render() {
    return <SelfCenterLayout>
        <Switch>
          {selfCenterRoutes.map(x => x.construct())}
        </Switch>
    </SelfCenterLayout>;
  }
}
