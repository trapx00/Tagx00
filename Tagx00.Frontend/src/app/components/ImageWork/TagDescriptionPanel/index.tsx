import React from "react";
import { Card } from 'antd';
import { TagDescriptionTuple, TagTuple } from "../../../models/instance/TagTuple";
import { AddableInputGroup } from "../AddableInputGroup";
import { TagPanel } from "./TagPanel";
import { LocaleMessage, Localize } from "../../../internationalization/components";
import { TagConfTuple } from "../../../models/mission/MissionAsset";


interface Props {
  tuple: TagDescriptionTuple;
  onChange: (tuple: TagDescriptionTuple) => void;
  readonlyMode: boolean;
  tagConfTuples?: TagConfTuple[];
  allowCustomTag?: boolean;
}

export const panelStyle = {
  marginTop: "8px"
};

const ID_PREFIX = "drawingPad.common.tagDescriptionTuplePanel.";

export class TagDescriptionTuplePanel extends React.Component<Props, {}> {

  static defaultProps = {
    tags: [],
    allowCustomTag: true
  };

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


    return <>
      <TagPanel tagTuples={this.props.tuple.tagTuples}
                onChange={this.onTagsChange}
                readonly={this.props.readonlyMode}
                allowCustomTag={this.props.allowCustomTag}
                tagConfTuples={this.props.tagConfTuples}
      />
      <Card title={<LocaleMessage id={ID_PREFIX + "descriptions"}/>}>

        <Localize replacements={{prompt: ID_PREFIX + "inputPrompt", addOne: ID_PREFIX+"addOne"}}>
          {props => <AddableInputGroup items={this.props.tuple.descriptions}
                                       onChange={this.onDescriptionsInputChange}
                                       inputPrompt={props.prompt}
                                       addingButtonPlaceholder={props.addOne}
                                       readonly={this.props.readonlyMode}

          />}
        </Localize>

      </Card>
    </>
  }
}
