import React from "react";
import { Card, Input, Button, Icon, Tag, Tooltip, Modal } from 'antd';
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { TagDescriptionTuple, TagTuple } from "../../../models/instance/TagTuple";
import { AddableInputGroup } from "../AddableInputGroup";
import { ClickableTag } from "../../ClickableTag/index";
import { TagPanel } from "./TagPanel";

interface Props {
  tuple: TagDescriptionTuple;
  onChange: (tuple: TagDescriptionTuple) => void;
}

export const panelStyle = {
  marginTop: "8px"
};





@observer
export class TagDescriptionTuplePanel extends React.Component<Props, {}> {

  @observable tuple: TagDescriptionTuple;

  fillTuple() {
    const { tuple } = this.props;
    if (!tuple) {
      this.tuple = {
        descriptions: [],
        tagTuples: []
      }
    } else {
      this.tuple = {
        descriptions: tuple.descriptions || [],
        tagTuples: tuple.tagTuples || []
      }
    }
  }

  constructor(props) {
    super(props);
    this.fillTuple();
  }

  @action onDescriptionsInputChange = (newItems: string[]) => {
    this.tuple.descriptions = newItems;
    this.callOnChange();
  };

  @action onTagsChange = (tags: TagTuple[]) => {
    this.tuple.tagTuples = tags;
    this.callOnChange();
  };


  callOnChange() {
    this.props.onChange(this.tuple);
  }

  render() {


    return <div>
      <TagPanel tagTuples={this.tuple.tagTuples} onChange={this.onTagsChange}/>
      <Card style={panelStyle} title={"descriptions"}>

        <AddableInputGroup items={this.tuple.descriptions}
                           onChange={this.onDescriptionsInputChange}/>

      </Card>
    </div>
  }
}
