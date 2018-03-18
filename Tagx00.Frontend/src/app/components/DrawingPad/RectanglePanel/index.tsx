import React, { CSSProperties } from "react";
import { BackgroundStage } from "../utils/BackgroundStage";
// import {RectangleTool} from "./Tools/Rectangle";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { Rectangle } from "./Rectangle";

import { CanvasLayer } from "./CanvasLayer";
import { RectangleNotation } from "./RectangleNotation";
import { RectangleNotationItemComponent } from "./RectangleNotationItemComponent";
import { ExistingLayer } from "./ExistingLayer";
import { RectangleCanvasContainer } from "./RectangleCanvasContainer";

interface Props {
  imageUrl: string;

}




@observer
export class RectanglePanel extends React.Component<Props, {}> {
  @observable addingNotation: boolean = false;
  @observable parts: RectangleNotation[] = [];


  @action onDrawComplete = (rectangle: Rectangle) => {
    const part = new RectangleNotation(rectangle);
    part.select();
    part.modify();
    this.parts = this.parts.concat([part]);
    this.addingNotation = false;
  };

  @action addOne = () => {
    this.addingNotation = true;
  };

  @action onRecClicked = (rec: RectangleNotation) => {
    this.toggleSelect(rec);
  };

  @action toggleSelect = (other: RectangleNotation) => {
    other.toggleSelect();
    this.parts = this.parts.filter(x => true); // force existing layer refresh
  };



  render() {
    return <div>
      <p>局部标注</p>
      <RectangleCanvasContainer
        drawingMode={this.addingNotation}
        onRectangleComplete={this.onDrawComplete}
        onRectangleClicked={this.onRecClicked}
        rectangles={this.parts}
        imageUrl={this.props.imageUrl}
        />

      {this.addingNotation
      ? <button disabled>请进行你的标记</button>
      : <button onClick={this.addOne}>增加一个标记</button>
      }

      <p>已有局部：</p>
      {this.parts.map(x => {
        return <RectangleNotationItemComponent key={x.rectangle.id}
                                               onSelect={() => this.toggleSelect(x)}
                                               part={x}/>
      })}
    </div>;
  }

}
