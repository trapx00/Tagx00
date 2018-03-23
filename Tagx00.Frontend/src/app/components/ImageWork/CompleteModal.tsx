import React from "react";
import { Modal, Button } from 'antd';

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
    return <Modal visible={this.props.shown}
                  title={"completed"}
                  footer={[
                    <Button key="goBack" onClick={this.onCancel}>Go Back</Button>,
                    <Button key="r" onClick={this.onSaveProgress}>Save Progress</Button>,
                    <Button key="submit" type="primary" onClick={this.onSubmit}>
                      Submit
                    </Button>
                  ]}
    >
      <p>Congrats! You have finished all jobs of this mission. You may choose to save progress or submit current work. (You won't be able to change your notations once you submitted your work.</p>
    </Modal>
  }
}
