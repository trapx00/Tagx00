import React from "react";
import { Card, Input, Button, Icon, Tag, Tooltip, Modal } from 'antd';
import { observer } from "mobx-react";
import { action, observable, toJS } from "mobx";
import { TagDescriptionTuple, TagTuple } from "../../../models/instance/TagTuple";
import { AddableInputGroup } from "../AddableInputGroup";
import { TagPanel } from "./TagPanel";

interface Props {
  tuple: TagDescriptionTuple;
  onChange: (tuple: TagDescriptionTuple) => void;
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


    return <div>
      <TagPanel tagTuples={this.props.tuple.tagTuples} onChange={this.onTagsChange}/>
      <Card style={panelStyle} title={"descriptions"}>

        <AddableInputGroup items={this.props.tuple.descriptions}
                           onChange={this.onDescriptionsInputChange}/>

      </Card>
    </div>
  }
}
