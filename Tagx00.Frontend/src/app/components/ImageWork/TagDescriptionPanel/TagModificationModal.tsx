import React from 'react';
import { TagTuple } from "../../../models/instance/TagTuple";
import { Button, Input, Modal } from 'antd';
import { AddableInputGroup } from "../AddableInputGroup";
import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { LocaleMessage, Localize } from "../../../internationalization/components";
import { FormItem } from "../../Form/FormItem";
import { ClickableTag } from "../../ClickableTag";
import { TagConfTuple } from "../../../models/mission/MissionAsset";
interface Props {
  tagTuple: TagTuple;
  onRemove: (tagTuple: TagTuple) => void;
  onComplete: (tagTuple: TagTuple) => void;
  onCancel: () => void;
  readonly: boolean;
  tagConfTuples?: TagConfTuple[];
  allowCustomTag?: boolean;
}

const ID_PREFIX = "drawingPad.common.tagDescriptionTuplePanel.";

@observer
export class TagModificationModal extends React.Component<Props, {}> {

  static defaultProps = {
    allowCustomTag: true,
    tags: []
  };

  @observable tuple: TagTuple = {...this.props.tagTuple};

  onOk = () => {

    if (!this.tagNameValid) {
      return;
    }
    this.props.onComplete(this.tuple);
  };

  @computed get tagNameValid() {
    return !!this.tuple.tag;

  }

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

  @action onTagClick = (value: string) => {
    this.tuple.tag = value;
  };

  render() {
    const footer = [<Button key="back" onClick={this.onCancel}>
      <LocaleMessage id={ID_PREFIX + "cancel"}/>
    </Button>];

    if (!this.props.readonly) {
      footer.push(<Button key="remove" type="danger" onClick={this.onRemove}>
          <LocaleMessage id={ID_PREFIX + "remove"}/>
        </Button>,
        <Button key="submit" type="primary" onClick={this.onOk}>
          <LocaleMessage id={ID_PREFIX + "ok"}/>
        </Button>);
    }

    return <Modal
      title={<LocaleMessage id={ID_PREFIX + "tagInformation"}/>}
      visible={true}
      onOk={this.onOk}
      onCancel={this.onCancel}
      footer={footer}
    >
      <h3><LocaleMessage id={ID_PREFIX + "tagName"}/></h3>
      {!this.props.readonly && <div>
        {!this.props.allowCustomTag &&
        <LocaleMessage id={ID_PREFIX + "tagLimited"}/>
        }
        {this.props.tagConfTuples.map(x =>
          <ClickableTag key={x.tag}
                        onClick={() => this.onTagClick(x.tag)}>{x}({x.confidence})</ClickableTag>)}
      </div>
      }


      <Localize replacements={{
        placeholder: ID_PREFIX + "tagName",
        messageOnInvalid: ID_PREFIX + "tagNameInvalid"
      }}>
        {props => <FormItem valid={this.tagNameValid}
                            messageOnInvalid={props.messageOnInvalid}
        >

          <Input placeholder={props.placeholder}
                 value={this.tuple.tag}
                 disabled={!this.props.allowCustomTag}
                 onChange={this.onTagNameChange}
          />

        </FormItem>}

      </Localize>
      <h3><LocaleMessage id={ID_PREFIX + "descriptions"}/></h3>
      <Localize replacements={{placeholder: ID_PREFIX + "addOne"}}>
        {props => <AddableInputGroup items={this.tuple.descriptions}
                                     readonly={this.props.readonly}
                                     onChange={this.onDescriptionsChange}
                                     inputPrompt={props.placeholder}
                                     addingButtonPlaceholder={props.placeholder}
        />

        }
      </Localize>
    </Modal>
  }
}
