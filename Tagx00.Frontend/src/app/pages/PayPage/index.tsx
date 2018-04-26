import React from 'react';
import { UserRole } from "../../models/user/User";
import { requireLogin } from "../hoc/RequireLogin";
import { SubMenuLayout } from "../../layouts/SubMenuLayout";
import { Redirect, RouteComponentProps, Switch } from "react-router";
import { AsyncRoute } from "../../router/AsyncRoute";
import { parseQueryString } from "../../router/utils";
import { NavItemProps } from "../../stores/NavStore";

interface Props {
  token?: string;
  currentRole?: UserRole;
}

interface State {
  remainingCredits: number;
  input: string;
  paying: boolean;
}

async function renderAccountPayPage() {
  const Page = (await import("./AccountPayPage")).AccountPayPage;

  return <Page />;
}

async function renderMissionPayPage(props: RouteComponentProps<any>) {
  const parsedQuery = parseQueryString(props.location.search);
  const Page = (await import("./MissionPayPage")).MissionPayPage;
  return <Page missionId={parsedQuery.missionId as string}/>;
}

const ID_PREFIX = "pay.";

const routes: NavItemProps[] = [
  {
    path: "/pay/account",
    iconName: "credit-card",
    id: ID_PREFIX + "payAccount",
    match: (pathname: string) => pathname.startsWith("/pay/account")
  },
  {
    path: "/pay/mission",
    iconName: "tag-o",
    id: ID_PREFIX + "payMission",
    match: (pathname: string) => pathname.startsWith("/pay/mission")
  }
];

@requireLogin()
export class PaymentPage extends React.Component<Props, State> {

  render() {
    return <SubMenuLayout routes={routes}>
      <Switch>
        <Redirect exact from={"/pay"} to={"/pay/account"}/>
        <AsyncRoute path={"/pay/account"} render={renderAccountPayPage}/>
        <AsyncRoute path={"/pay/mission"} render={renderMissionPayPage}/>
      </Switch>
    </SubMenuLayout>


  }
}
