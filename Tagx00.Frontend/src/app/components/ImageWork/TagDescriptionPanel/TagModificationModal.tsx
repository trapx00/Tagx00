import React from 'react';
import { TagTuple } from "../../../models/instance/TagTuple";
import { Button, Input, Modal } from 'antd';
import { AddableInputGroup } from "../AddableInputGroup";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { LocaleMessage, Localize } from "../../../internationalization/components";

interface Props {
  tagTuple: TagTuple;
  onRemove: (tagTuple: TagTuple) => void;
  onComplete: (tagTuple: TagTuple) => void;
  onCancel: () => void;
  readonly: boolean;
}


@observer
export class TagModificationModal extends React.Component<Props, {}> {

  @observable tuple: TagTuple = {...this.props.tagTuple};

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
    const prefix = "drawingPad.common.tagDescriptionTuplePanel.";

    const footer = [<Button key="back" onClick={this.onCancel}>
      <LocaleMessage id={prefix + "cancel"}/>
    </Button>];

    if (!this.props.readonly) {
      footer.push(<Button key="remove" type="danger" onClick={this.onRemove}>
          <LocaleMessage id={prefix + "remove"}/>
        </Button>,
        <Button key="submit" type="primary" onClick={this.onOk}>
          <LocaleMessage id={prefix + "ok"}/>
        </Button>);
    }

    return <Modal
      title={<LocaleMessage id={prefix + "tagInformation"}/>}
      visible={true}
      onOk={this.onOk}
      onCancel={this.onCancel}
      footer={footer}
    >
      <h3><LocaleMessage id={prefix + "tagName"}/></h3>
      <Localize replacements={{placeholder: prefix + "tagName"}}>
        {props => <Input placeholder={props.placeholder}
                         value={this.tuple.tag}
                         onChange={this.onTagNameChange}
        />}
      </Localize>
      <h3><LocaleMessage id={prefix + "descriptions"}/></h3>
      <Localize replacements={{ placeholder: prefix+"addOne"}}>
        {props => <AddableInputGroup items={this.tuple.descriptions}
                                     readonly={this.props.readonly}
                                     onChange={this.onDescriptionsChange}
                                     inputPrompt={props.placeholder}/>

        }
      </Localize>
    </Modal>
  }
}
