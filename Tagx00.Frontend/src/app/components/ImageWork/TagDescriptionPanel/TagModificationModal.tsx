import React from 'react';
import { TagTuple } from "../../../models/instance/TagTuple";
import { Modal, Button, Input } from 'antd';
import { AddableInputGroup } from "../AddableInputGroup";
import { observer } from "mobx-react";
import { action, observable } from "mobx";

interface Props {
  tagTuple: TagTuple;
  onRemove: (tagTuple: TagTuple) => void;
  onComplete: (tagTuple: TagTuple) => void;
  onCancel: () => void;
}

@observer
export class TagModificationModal extends React.Component<Props, {}> {

  @observable tuple: TagTuple = {...this.props.tagTuple};

  constructor(props) {
    super(props);
    console.log("new modal");
  }

  onOk = () => {
    this.props.onComplete(this.tuple);
  };

  onCancel = () => {
    this.props.onCancel();
  };

  @action onTagNameChange = (e) => {
    this.tuple.tag = e.target.value;
  };

  @action onDescriptionsChange = (items) => {
    this.tuple.descriptions = items;
  };

  onRemove = () => {
    this.props.onRemove(this.props.tagTuple);
  };

  render() {
    return <Modal
      title={"Tag information"}
      visible={true}
      onOk={this.onOk}
      onCancel={this.onCancel}
      footer={[
        <Button key="back" onClick={this.onCancel}>Cancel</Button>,
        <Button key="remove" type="danger" onClick={this.onRemove}>Remove</Button>,
        <Button key="submit" type="primary" onClick={this.onOk}>
          OK
        </Button>,
      ]}
    >
      <h3>Tag Name</h3>
      <Input placeholder={"Tag Name"}
             value={this.tuple.tag}
             onChange={this.onTagNameChange}

      />
      <h3>Descriptions</h3>
      <AddableInputGroup items={this.tuple.descriptions}
                         onChange={this.onDescriptionsChange}/>
    </Modal>
  }
}
