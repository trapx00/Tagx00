import React, { ReactNode } from 'react';
import { Inject } from "react.di";
import { Button, Form, Input, message } from 'antd';
import { UserRole } from "../../models/user/User";
import { FormItemProps } from "antd/lib/form/FormItem";
import { PayService } from "../../api/PayService";
import { LocaleMessage } from "../../internationalization/components";
import { requireLogin } from "../hoc/RequireLogin";
import { FormItem } from "../../components/Form/FormItem";
import { SiderLayout } from "../../layouts/SiderLayout";
import { PayPageSideMenu } from "./PayPageSideMenu";
import { Switch, Redirect } from "react-router";
import { AsyncRoute } from "../../router/AsyncRoute";

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
  return <Page/>;
}

async function renderMissionPayPage() {
  const Page = (await import("./MissionPayPage")).MissionPayPage;
  return <Page/>;
}

const ID_PREFIX = "pay.";

@requireLogin()
export class PaymentPage extends React.Component<Props, State> {

  render() {
    return <SiderLayout leftSider={<PayPageSideMenu/>}>
      <Switch>
        <Redirect exact from={"/pay"} to={"/pay/account"}/>
        <AsyncRoute path={"/pay/account"} render={renderAccountPayPage}/>
        <AsyncRoute path={"/pay/mission"} render={renderMissionPayPage}/>
      </Switch>
    </SiderLayout>


  }
}
