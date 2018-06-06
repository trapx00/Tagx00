import { observer } from "mobx-react";
import { TagTuple } from "../../../models/instance/TagTuple";
import React from "react";
import { action, computed, observable } from "mobx";
import { Card, Icon, Tag, Tooltip } from 'antd';
import { panelStyle } from "./index";
import { TagModificationModal } from "./TagModificationModal";
import { LocaleMessage } from "../../../internationalization/components";
import { TagConfTuple } from "../../../models/mission/MissionAsset";


const AnyTag = Tag as any;

interface Props {
  tagTuples: TagTuple[];
  onChange: (tags: TagTuple[]) => void;
  readonly: boolean;
  tagConfTuples: TagConfTuple[];
  allowCustomTag?: boolean;
}

const ID_PREFIX = "drawingPad.common.tagDescriptionTuplePanel.";

@observer
export class TagPanel extends React.Component<Props, {}> {

  static defaultProps = {
    allowCustomTag: true,
    tags: []
  };

  @observable selectedIndex: number = -1;

  @computed get selectedTagTuple() {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.props.tagTuples.length) {
      return this.props.tagTuples[this.selectedIndex];
    } else {
      return null;
    }
  }

  @action onTagRemove = (tagTuple: TagTuple) => {
    this.props.onChange(this.props.tagTuples.filter(x => x !== tagTuple));
    this.selectedIndex = -1;
  };

  addNewTag = () => {
    const newTuple = {
      tag: "",
      descriptions: []
    };

    this.props.onChange(this.props.tagTuples.concat([newTuple]));
    this.selectTag(this.props.tagTuples.length);
  };

  @action selectTag(index: number) {
    this.selectedIndex = index;
  }


  @action onTagChangeComplete = (tag: TagTuple) => {
    const items = this.props.tagTuples.slice();
    items[this.selectedIndex] = tag;
    this.selectedIndex = -1;
    this.props.onChange(items);
  };

  @action onTagChangeCancelled = () => {
    this.selectedIndex = -1;
  };

  render() {

    return <Card title={<LocaleMessage id={ID_PREFIX + "tags"}/>}>
      {this.props.tagTuples.map(({tag},index) => {
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
      {this.props.readonly ? null
        : <AnyTag
        onClick={this.addNewTag}
        style={{ background: '#fff', borderStyle: 'dashed' }}
      >
        <Icon type="plus" /> <LocaleMessage id={ID_PREFIX + "newTag"}/>
      </AnyTag>}

      {this.selectedTagTuple
        ? <TagModificationModal onRemove={this.onTagRemove}
                                tagTuple={this.selectedTagTuple}
                                onComplete={this.onTagChangeComplete}
                                onCancel={this.onTagChangeCancelled}
                                readonly={this.props.readonly}
                                tagConfTuples={this.props.tagConfTuples}
                                allowCustomTag={this.props.allowCustomTag}
        />
        : null
      }
    </Card>
  }
}
