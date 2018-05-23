import React from 'react';
import { UserStore } from "../../../../stores/UserStore";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { Form } from 'antd';
import { ImageMissionCreateInfoForm } from "./image";
import { Inject } from "react.di";
import { LocaleMessage } from "../../../../internationalization/components";
import { MissionTypeMenu } from "./MissionTypeMenu";
import { Redirect, Route, Switch } from "react-router";
import { AsyncRoute } from "../../../../router/AsyncRoute";

const FormItem = Form.Item;

interface Props {

}

async function renderImageCreate() {
  const Page = (await import("./image")).ImageMissionCreateInfoForm;
  return <Page/>;
}

@observer
export class MissionCreatePage extends React.Component<Props, {}> {

  @observable title: string = "";
  @observable description: string = "";

  @observable imageMissionTypes: ImageMissionType[] = [];
  @Inject userStore: UserStore;

  render() {
    return <div>
      <h1><LocaleMessage id={"missions.createMission.title"}/></h1>
      <br/>
      <MissionTypeMenu/>
      <Switch>
        <AsyncRoute exact path={"/mission/requester/create/IMAGE"} render={() => {

      }}/>
        <Route exact path={"/mission/requester/create/TEXT"} render={() => {

        }}/>
        <Redirect to={"/mission/requester/create/IMAGE"}/>
      </Switch>
      <ImageMissionCreateInfoForm/>
    </div>;
  }
}
