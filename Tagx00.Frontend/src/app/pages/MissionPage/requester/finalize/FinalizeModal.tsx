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

interface Props {
  readonly: boolean;
  instanceId: string;
  close: () => void;
  shown: boolean;
}

const ID_PREFIX = "missions.requester.instancePanel.finalize.";

enum InitializingState {
  NotStarted,
  Initializing,
  Initialized
}

interface State {
  instanceId: string;
  submitting: boolean;
  initializingState: InitializingState;
}

export class FinalizeModal extends React.Component<Props, State> {

  parameters: MissionFinalizeParameters;

  @Inject requesterService: RequesterService;
  @Inject userStore: UserStore;
  @Inject payService: PayService;

  state = {
    instanceId: this.props.instanceId,
    submitting: false,
    initializingState: InitializingState.NotStarted,
  };

  componentDidMount() {
    this.initialParameters();
  }

  componentDidUpdate() {
    this.initialParameters();
  }


  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {instanceId: nextProps.instanceId, initializingState: InitializingState.NotStarted}
  }

  @action async initialParameters() {
    if (this.state.initializingState === InitializingState.NotStarted) {
      this.setState({initializingState: InitializingState.Initializing});
      if (this.props.readonly) {
        this.parameters = new MissionFinalizeParameters();
        this.setState({initializingState: InitializingState.Initialized});
      } else {
        const res = await this.payService.getCredits(this.userStore.token);
        this.parameters = new MissionFinalizeParameters(res.credits);
        this.setState({ initializingState: InitializingState.Initialized});
      }
    }
  }

  submit = async () => {
    if (!this.parameters.valid) {
      return;
    }
    this.setState({submitting: true});
    const res = await this.requesterService.finalize(this.props.instanceId, this.parameters, this.userStore.token);
    this.setState({submitting: false});
    Modal.success({
      title: "成功",
      onOk: this.goBack
    });
  };

  goBack = () => {
    this.props.close();
  };

  selectFooter() {

    if (this.state.initializingState !== InitializingState.Initialized) {
      return null;
    }

    if (this.props.readonly) {
      return [<Button key={"back"} type={"primary"}><LocaleMessage id={ID_PREFIX + "back"}/></Button>];
    }

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
      {this.state.initializingState !== InitializingState.Initialized ? "initializing" :
        <FinalizeForm value={this.parameters}
                      readonly={this.props.readonly}
        />
      }
    </Modal>
  }
}
