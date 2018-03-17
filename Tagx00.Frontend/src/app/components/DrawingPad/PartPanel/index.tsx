import React, { CSSProperties } from "react";
import { BackgroundStage } from "../BackgroundStage";
// import {RectangleTool} from "./Tools/Rectangle";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { Rectangle } from "./Rectangle";

import { CanvasLayer } from "./CanvasLayer";
import { Part } from "./Part";
import { NotationItem } from "./NotationItem";
import { ExistingLayer } from "./ExistingLayer";
import { PartPanelContainer } from "./PartPanelContainer";

interface PartTagPanelProps {
  imageUrl: string;

}




@observer
export class PartPanel extends React.Component<PartTagPanelProps, {}> {
  @observable addingNotation: boolean = false;
  @observable parts: Part[] = [];


  @action onDrawComplete = (rectangle: Rectangle) => {
    const part = new Part(rectangle);
    part.select();
    part.modify();
    this.parts = this.parts.concat([part]);
    this.addingNotation = false;
  };

  @action addOne = () => {
    this.addingNotation = true;
  };

  @action onRecClicked = (rec: Rectangle) => {
    const part = this.parts.find(x => x.rectangle === rec);
    if (part){
      this.toggleSelect(part);
    }
  };

  @action toggleSelect = (other: Part) => {
    other.toggleSelect();
    this.parts = this.parts.filter(x => true);
  };



  render() {
    return <div>
      <p>局部标注</p>
      <PartPanelContainer
        drawingMode={this.addingNotation}
        onRectangleComplete={this.onDrawComplete}
        onRectangleClicked={this.onRecClicked}
        rectangles={this.parts.map(x => x.rectangle)}
        imageUrl={this.props.imageUrl}
        />

      {this.addingNotation
      ? <button disabled>请进行你的标记</button>
      : <button onClick={this.addOne}>增加一个标记</button>
      }

      <p>已有局部：</p>
      {this.parts.map(x => {
        return <NotationItem key={x.rectangle.id}
                             onSelect={() => this.toggleSelect(x)}
                             part={x}/>
      })}
    </div>;
  }

}
