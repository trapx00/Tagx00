import React from "react";
import { Modal, Button } from 'antd';

interface Props {
  shown: boolean;
}

export class CompleteModal extends React.Component<Props, any> {

  onCancel = () => {
    console.log("cancel");
  };

  onOk = () => {
    console.log("submit");
  };

  render() {
    return <Modal visible={this.props.shown}
                  title={"completed"}
                  footer={[
                    <Button key="back" onClick={this.onCancel}>Return</Button>,
                    <Button key="submit" type="primary" onClick={this.onOk}>
                      Submit
                    </Button>
                  ]}
    >
      <p>Congrats! You have finished all jobs of this mission.</p>
    </Modal>
  }
}
