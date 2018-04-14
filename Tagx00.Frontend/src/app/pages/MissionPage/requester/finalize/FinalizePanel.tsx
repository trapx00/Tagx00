import React from 'react';
import { FinalizeForm } from "./FinalizeForm";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Button, Modal } from 'antd';
import { MissionFinalizeParameters } from "../../../../models/instance/MissionFinalizeParameters";
import { LocaleMessage } from "../../../../internationalization/components";
import { Inject } from "react.di";
import { RequesterService } from "../../../../api/RequesterService";
import { UserStore } from "../../../../stores/UserStore";
import { RouterStore } from "../../../../stores/RouterStore";


interface Props {
  instanceId: string;
}

const ID_PREFIX = "missions.requester.instancePanel.finalize.";

@observer
export class FinalizePanel extends React.Component<Props, {}> {


  @observable parameters = new MissionFinalizeParameters();

  @Inject requesterService: RequesterService;
  @Inject userStore: UserStore;
  @Inject routerStore: RouterStore;


  submit = async () => {
    const res = await this.requesterService.finalize(this.props.instanceId, this.parameters, this.userStore.token);
    Modal.success({
      title: "成功"
    });
  };

  goBack = () => {
    this.routerStore.goBack();
  };

  render() {
    return <div>
      <h1><LocaleMessage id={ID_PREFIX+"title"}/></h1>
      <FinalizeForm value={this.parameters} readonly={false}/>
      <Button.Group>
        <Button type={"primary"} onClick={this.submit}><LocaleMessage id={ID_PREFIX + "submit"}/></Button>
        <Button onClick={this.parameters.backToDefault}><LocaleMessage id={ID_PREFIX +"default"}/></Button>
        <Button onClick={this.goBack}><LocaleMessage id={ID_PREFIX + "back"}/></Button>
      </Button.Group>
    </div>
  }
}
