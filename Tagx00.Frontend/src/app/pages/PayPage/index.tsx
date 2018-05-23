import React from 'react';
import { UserRole } from "../../models/user/User";
import { requireLogin } from "../hoc/RequireLogin";
import { Redirect, RouteComponentProps, Switch } from "react-router";
import { AsyncRoute } from "../../router/AsyncRoute";
import { parseQueryString } from "../../router/utils";

interface Props {
  token?: string;
  currentRole?: UserRole;
}

interface State {
  remainingCredits: number;
  input: string;
  paying: boolean;
}

async function renderMissionPayPage(props: RouteComponentProps<any>) {
  const parsedQuery = parseQueryString(props.location.search);
  const Page = (await import("./MissionPayPage")).MissionPayPage;
  return <Page missionId={parsedQuery.missionId as string}/>;
}

const ID_PREFIX = "pay.";


@requireLogin()
export default class PaymentPage extends React.Component<Props, State> {

  render() {
    return <Switch>
        <Redirect exact from={"/pay"} to={"/pay/account"}/>
        <AsyncRoute path={"/pay/account"} component={import("./AccountPayPage")}/>
        <AsyncRoute path={"/pay/mission"} render={renderMissionPayPage}/>
      </Switch>
  }
}
