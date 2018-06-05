import React from 'react';
import { AudioPartTuple } from "../../../../../../models/instance/audio/job/AudioPartJob";
import { Card, List, Button } from 'antd';
import { LocaleMessage } from "../../../../../../internationalization/components";

interface Props {
  tuples: AudioPartTuple[];
  selected: AudioPartTuple;

  onAdd?(): void;

  onRemove?(tuple: AudioPartTuple): void;

  onSelect?(tuple: AudioPartTuple): void;

  onPlay?(tuple: AudioPartTuple): void;

  onSetStartTime?(tuple: AudioPartTuple): void;

  onSetEndTime?(tuple: AudioPartTuple): void;
}


const ID_PREFIX = "drawingPad.audio.tupleSelector.list.";

export class AudioTupleList extends React.Component<Props, {}> {


  onSelect = (tuple: AudioPartTuple) => {
    if (tuple && this.props.onSelect) {
      this.props.onSelect(tuple);
    }
  };
  onPlay = (tuple: AudioPartTuple) => {
    if (tuple && this.props.onPlay) {
      this.props.onPlay(tuple);
    }
  };

  onRemove = (tuple: AudioPartTuple) => {
    if (tuple && this.props.onRemove) {
      this.props.onRemove(tuple);
    }
  };

  onAdd = () => {
    this.props.onAdd && this.props.onAdd();
  };


  render() {
    return <Card
      title={<LocaleMessage id={ID_PREFIX+"title"}/>}
    >
      <Button type={"primary"} onClick={this.onAdd}><LocaleMessage id={ID_PREFIX+"add"}/></Button>
      {this.props.tuples.map( (x,index) => {
        return <div>
          <p>片段{index}。{x===this.props.selected ? "被选中了" : ""}</p>
          <p><button onClick={()=>this.onPlay(x)}>播放我</button></p>
          <p>开始时间：{x.startOffset} <button onClick={() => this.props.onSetStartTime(x)}>设置</button></p>
          <p>结束时间：{x.endOffset}<button onClick={() => this.props.onSetEndTime(x)}>设置</button></p>
          <p><button onClick={()=>this.onRemove(x)}>删掉我</button></p>
          <p><button onClick={()=>this.onSelect(x)}>选择我</button></p>
        </div>
      })}
    </Card>
  }
}
