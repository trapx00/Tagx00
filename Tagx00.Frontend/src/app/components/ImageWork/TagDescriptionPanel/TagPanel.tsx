import { observer } from "mobx-react";
import { TagTuple } from "../../../models/instance/TagTuple";
import React from "react";
import { action, computed, observable } from "mobx";
import { Icon, Card, Tooltip, Tag } from 'antd';
import { ClickableTag } from "../../ClickableTag";
import { panelStyle } from "./index";
import { TagModificationModal } from "./TagModificationModal";
import { removeElementAt } from "../../../../utils/Array";


const AnyTag = Tag as any;

interface Props {
  tagTuples: TagTuple[];
  onChange: (tags: TagTuple[]) => void;
}


@observer
export class TagPanel extends React.Component<Props, {}> {

  @observable tagTuples: TagTuple[] = this.props.tagTuples;
  @observable showModal: boolean = false;
  @observable selectedIndex: number = -1;

  @computed get selectedTagTuple() {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.tagTuples.length) {
      return this.tagTuples[this.selectedIndex];
    } else {
      return null;
    }
  }

  @action onTagRemove = (tagTuple: TagTuple) => {
    this.tagTuples = this.tagTuples.filter(x => x !== tagTuple);
    this.selectedIndex = -1;
    this.callOnChange();
  };

  @action addNewTag = () => {
    const newTuple = {
      tag: "",
      descriptions: []
    };
    this.tagTuples = this.tagTuples.concat([newTuple]);
    this.selectTag(this.tagTuples.length-1);
  };

  @action selectTag(index: number) {
    this.selectedIndex = index;
    this.showModal = true;
  }

  @action onTagChanged = (tag: TagTuple) => {
    this.tagTuples[this.selectedIndex] = tag;
    this.showModal = false;
    this.selectedIndex = -1;
    this.callOnChange();
  };

  callOnChange() {
    this.props.onChange(this.tagTuples);
  }

  render() {

    return <Card style={panelStyle} title={"Tags"}>
      {this.tagTuples.map(({tag},index) => {
        const isLongTag = tag.length > 20;

        const tagElem = (
          <AnyTag
            key={index}
            onClick={() => this.selectTag(index)}>
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </AnyTag>
        );
        return isLongTag
          ? <Tooltip title={tag} key={index}>{tagElem}</Tooltip>
          : tagElem;
      })}
      <AnyTag
        onClick={this.addNewTag}
        style={{ background: '#fff', borderStyle: 'dashed' }}
      >
        <Icon type="plus" /> New Tag
      </AnyTag>
      {this.selectedTagTuple
        ? <TagModificationModal onRemove={this.onTagRemove} tagTuple={this.selectedTagTuple} onChange={this.onTagChanged}/>
        : null
      }
    </Card>
  }
}
