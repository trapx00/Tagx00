import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../../../stores/UserStore";
import { RequesterService } from "../../../../api/RequesterService";
import { action, runInAction } from "mobx";
import { Button, Modal } from 'antd';
import { MissionFinalizeParameters } from "../../../../models/instance/MissionFinalizeParameters";
import { LocaleMessage } from "../../../../internationalization/components";
import { FinalizeForm } from "./FinalizeForm";
import { PayService } from "../../../../api/PayService";
import { InstanceDetailResponse } from "../../../../models/response/mission/InstanceDetailResponse";
import { Loading } from "../../../../components/Common/Loading";

interface Props {
  instanceId: string;
  missionId: string;
  close: () => void;
  refresh : () => void;
  shown: boolean;
}

const ID_PREFIX = "missions.requester.instancePanel.finalize.";

interface State {
  submitting: boolean;
}

export class FinalizeModal extends React.Component<Props, State> {

  parameters: MissionFinalizeParameters = new MissionFinalizeParameters();

  @Inject requesterService: RequesterService;
  @Inject payService: PayService;

  state = {
    submitting: false,
  };


  getAvailableCredits = async () => {
    return (await this.requesterService.getRemainingCreditsForAMission(this.props.missionId)).remainingCredits;
  };

  submit = async () => {
    if (!this.parameters.valid) {
      return;
    }
    this.setState({submitting: true});
    const res = await this.requesterService.finalize(this.props.instanceId, this.parameters.value);
    this.setState({submitting: false});
    Modal.success({
      title: "成功",
      onOk: () => {
        this.props.refresh();
        this.props.close();
      }
    });
  };

  goBack = () => {
    this.props.close();
  };

  selectFooter() {
    return [
      <Button key={"submit"} type={"primary"} loading={this.state.submitting} onClick={this.submit}><LocaleMessage
        id={ID_PREFIX + "submit"}/></Button>,
      <Button key={"default"} onClick={this.parameters.backToDefault}><LocaleMessage
        id={ID_PREFIX + "default"}/></Button>,
      <Button key={"back"} onClick={this.goBack}><LocaleMessage id={ID_PREFIX + "back"}/></Button>
    ]
  }

  render() {

    return <Modal visible={this.props.shown}
                  title={<LocaleMessage id={ID_PREFIX + "title"}/>}
                  onCancel={this.goBack}
                  footer={this.selectFooter()}
    >
        <FinalizeForm value={this.parameters}
                      missionId={this.props.missionId}
                      getAvailableCredits={this.getAvailableCredits}
        />

          </Modal>
  }
}
