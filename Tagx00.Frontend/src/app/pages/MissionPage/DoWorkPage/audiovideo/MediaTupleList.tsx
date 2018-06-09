import React from 'react';
import { AudioPartTuple } from "../../../../models/instance/audio/job/AudioPartJob";
import { Card, List, Button, Icon, Divider, Tooltip } from 'antd';
import { LocaleMessage } from "../../../../internationalization/components/index";
import { VideoPartJob, VideoPartTuple } from "../../../../models/instance/video/job/VideoPartJob";

type MediaPartTuple = AudioPartTuple | VideoPartTuple;

interface Props {
  tuples: MediaPartTuple[];
  selected: MediaPartTuple;

  onAdd?(): void;

  onRemove?(tuple: MediaPartTuple): void;

  onSelect?(tuple: MediaPartTuple): void;

  onPlay?(tuple: MediaPartTuple): void;

  onSetStartTime?(tuple: MediaPartTuple): void;

  onSetEndTime?(tuple: MediaPartTuple): void;
}


const ID_PREFIX = "drawingPad.media.tupleSelector.list.";

export class MediaTupleList extends React.Component<Props, {}> {


  onSelect = (tuple: MediaPartTuple) => {
    if (tuple && this.props.onSelect) {
      this.props.onSelect(tuple);
    }
  };
  onPlay = (tuple: MediaPartTuple) => {
    if (tuple && this.props.onPlay) {
      this.props.onPlay(tuple);
    }
  };

  onRemove = (tuple: MediaPartTuple) => {
    if (tuple && this.props.onRemove) {
      this.props.onRemove(tuple);
    }
  };

  onAdd = () => {
    this.props.onAdd && this.props.onAdd();
  };


  renderItem = (item: MediaPartTuple) => {
    return <List.Item actions={[
      item===this.props.selected
        ? <Tooltip title={<LocaleMessage id={ID_PREFIX + "selected"}/>}>
          <Icon type={"select"}/>
        </Tooltip>
        : <a onClick={() => this.onSelect(item)}>
        <Tooltip title={<LocaleMessage id={ID_PREFIX + "select"}/>}>
          <Icon type={"select"}/>
        </Tooltip>
        </a>,
      <a onClick={() => this.onPlay(item)}>
        <Tooltip title={<LocaleMessage id={ID_PREFIX+"play"}/>}>
          <Icon type={"play-circle"}/>
        </Tooltip>
      </a>,
      <a onClick={() => this.onRemove(item)}>
        <Tooltip title={<LocaleMessage id={ID_PREFIX + "remove"}/>}>
          <Icon type={"delete"}/>
        </Tooltip>
      </a>,
    ]}>
      <div>
        <LocaleMessage id={ID_PREFIX+"range"} replacements={{
          start:         <Button onClick={() => this.props.onSetStartTime(item)}>
            <Tooltip title={<LocaleMessage id={ID_PREFIX + "setStart"}/>}>
              {item.startOffset.toFixed(2)}
            </Tooltip>
          </Button>,
          end:         <Button onClick={() => this.props.onSetEndTime(item)}>
            <Tooltip title={<LocaleMessage id={ID_PREFIX + "setEnd"}/>}>
              {item.endOffset.toFixed(2)}
            </Tooltip>
          </Button>
        }}/>

      </div>
    </List.Item>

  };

  render() {
    return <Card
      title={
        <LocaleMessage id={ID_PREFIX+"title"}/>
        }
    >
      <Button type={"primary"} onClick={this.onAdd}><LocaleMessage id={ID_PREFIX+"add"}/></Button>
      <List itemLayout={"horizontal"}
            dataSource={this.props.tuples}
            renderItem={this.renderItem}
      />
    </Card>
  }
}
