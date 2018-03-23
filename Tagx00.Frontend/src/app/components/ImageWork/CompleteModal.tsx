import React from "react";
import { Modal, Button } from 'antd';
import { LocaleMessage } from "../../internationalization/components";

interface Props {
  shown: boolean;
  submit: () => void;
  saveProgress: () => void;
  goBack: () =>void;
}

export class CompleteModal extends React.Component<Props, any> {

  onSaveProgress = () => {
    this.props.saveProgress();
  };

  onCancel = () => {
    this.props.goBack();
  };

  onSubmit = () => {
    this.props.submit();
  };

  render() {
    const prefix = "drawingPad.common.finish.";
    return <Modal visible={this.props.shown}
                  title={<LocaleMessage id={prefix+"editingCompleteTitle"}/>}
                  footer={[
                    <Button key="goBack" onClick={this.onCancel}>
                      <LocaleMessage id={prefix+"goBack"}/>
                    </Button>,
                    <Button key="saveProgress" onClick={this.onSaveProgress}>
                      <LocaleMessage id={prefix+"saveProgress"}/>
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.onSubmit}>
                      <LocaleMessage id={prefix+"submit"}/>
                    </Button>
                  ]}
    >
      <p><LocaleMessage id={prefix+"editingComplete"}/></p>
    </Modal>
  }
}
