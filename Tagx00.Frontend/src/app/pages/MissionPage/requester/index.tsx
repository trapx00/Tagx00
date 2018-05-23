import React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router";
import { parseQueryString } from "../../../router/utils";
import { UserRole } from "../../../models/user/User";
import { requireLogin } from "../../hoc/RequireLogin";
import { AsyncRoute } from "../../../router/AsyncRoute";

interface Props {

}



async function renderInstancePanel(props: RouteComponentProps<any>) {
  const RequesterInstancePanel = (await import("./RequesterInstancePanel")).RequesterInstancePanel;
  return <RequesterInstancePanel missionId={parseQueryString(props).missionId as string}/>;
}

async function renderInstanceSeeResult(props: RouteComponentProps<any>) {
  const Page = (await import("./RequesterSeeResultEntry")).RequesterSeeResultEntry;
  return <Page instanceId={props.match.params.instanceId}/>;
}


@requireLogin(UserRole.ROLE_REQUESTER)
export default class RequesterMissionPage extends React.Component<Props, {}> {

  render() {
    return <Switch>
      <AsyncRoute exact path={"/mission/requester/instance/:instanceId"} render={renderInstanceSeeResult}/>}/>
      <Route render={() =>
        <Switch>
          <AsyncRoute path={"/mission/requester/create"} component={import("./create")}/>
          <AsyncRoute exact path={"/mission/requester"} component={import("./RequesterMissionPanel")}/>
          <AsyncRoute path={"/mission/requester/instance"} exact
                 render={renderInstancePanel}/>
        </Switch>}/>

    </Switch>;
  }
}
