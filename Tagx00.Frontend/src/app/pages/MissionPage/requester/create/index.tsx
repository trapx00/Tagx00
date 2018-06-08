import React from 'react';
import { UserStore } from "../../../../stores/UserStore";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { Form } from 'antd';
import { Inject } from "react.di";
import { LocaleMessage } from "../../../../internationalization/components";
import { MissionTypeMenu } from "./MissionTypeMenu";
import { Redirect, Switch } from "react-router";
import { AsyncRoute } from "../../../../router/AsyncRoute";

const FormItem = Form.Item;

interface Props {

}

@observer
export default class MissionCreatePage extends React.Component<Props, {}> {

  @observable title: string = "";
  @observable description: string = "";

  @observable imageMissionTypes: ImageMissionType[] = [];
  @Inject userStore: UserStore;

  render() {
    return <div>
      <h1><LocaleMessage id={"missions.createMission.title"}/></h1>
      <br/>
      <MissionTypeMenu/>
      <div style={{marginTop: "16px"}}>
      <Switch>
        <AsyncRoute exact path={"/mission/requester/create/IMAGE"} component={import("./image")}/>
        <AsyncRoute exact path={"/mission/requester/create/TEXT"} component={import("./text")}/>
        <AsyncRoute exact path={'/mission/requester/create/AUDIO'} component={import("./audio")}/>
        <AsyncRoute exact path={'/mission/requester/create/THREE_DIMENSION'} component={import("./3d")}/>
        <AsyncRoute exact path={'/mission/requester/create/VIDEO'} component={import("./video")}/>
        <Redirect to={"/mission/requester/create/IMAGE"}/>
      </Switch>
    </div>
    </div>;
  }
}
