import React from "react";
import { Card, Input, Button, Icon, Tag, Tooltip, Modal } from 'antd';
import { observer } from "mobx-react";
import { action, observable, toJS } from "mobx";
import { TagDescriptionTuple, TagTuple } from "../../../models/instance/TagTuple";
import { AddableInputGroup } from "../AddableInputGroup";
import { TagPanel } from "./TagPanel";
import { LocaleMessage, Localize } from "../../../internationalization/components";

interface Props {
  tuple: TagDescriptionTuple;
  onChange: (tuple: TagDescriptionTuple) => void;
  readonlyMode: boolean;
}

export const panelStyle = {
  marginTop: "8px"
};


export class TagDescriptionTuplePanel extends React.Component<Props, {}> {

  onDescriptionsInputChange = (newItems: string[]) => {
    this.props.onChange({
      ...this.props.tuple,
      descriptions: newItems
    });
  };

  onTagsChange = (tags: TagTuple[]) => {
    this.props.onChange({
      ...this.props.tuple,
      tagTuples: tags
    });
  };


  render() {

    const prefix = "drawingPad.common.tagDescriptionTuplePanel.";
    return <div>
      <TagPanel tagTuples={this.props.tuple.tagTuples} onChange={this.onTagsChange} readonly={this.props.readonlyMode}/>
      <Card style={panelStyle} title={<LocaleMessage id={prefix + "descriptions"}/>}>

        <Localize replacements={{prompt: prefix + "inputPrompt", addOne: prefix+"addOne"}}>
          {props => <AddableInputGroup items={this.props.tuple.descriptions}
                                       onChange={this.onDescriptionsInputChange}
                                       inputPrompt={props.prompt}
                                       addingButtonPlaceholder={props.addOne}
                                       readonly={this.props.readonlyMode}

          />}
        </Localize>

      </Card>
    </div>
  }
}
