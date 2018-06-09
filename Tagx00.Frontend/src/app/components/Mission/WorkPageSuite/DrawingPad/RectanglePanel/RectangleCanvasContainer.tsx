import { Rectangle } from "./Rectangle";
import React from "react";
import { BackgroundStage } from "../utils/BackgroundStage";
import { ExistingLayer } from "./ExistingLayer";
import { CanvasLayer } from "./CanvasLayer";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { RectangleNotation } from "./RectangleNotation";

interface Props {
  drawingMode: boolean;
  onRectangleComplete: (rec: Rectangle) => void;
  onRectangleClicked: (rec: RectangleNotation) => void;
  selectedRectangle: RectangleNotation;
  rectangles: RectangleNotation[];
  imageUrl: string;
  onImageLoaded: (width: number, height: number) => void;
  getScale: ()=>number;

}

@observer
export class RectangleCanvasContainer extends React.Component<Props,{}> {
  @observable width: number;
  @observable height: number;

  @action onBackgroundImageLoaded = (width, height) => {
    this.width = width;
    this.height = height;
    this.props.onImageLoaded(width, height);
  };


  render() {
    return <BackgroundStage imageUrl={this.props.imageUrl}
                     onImageLoaded={this.onBackgroundImageLoaded}>
      <ExistingLayer rectangles={this.props.rectangles}
                     width={this.width}
                     height={this.height}
                     onRectangleClicked={this.props.onRectangleClicked}
                     selectedRectangle={this.props.selectedRectangle}
                     getScale={this.props.getScale}
      />
      {this.props.drawingMode
        ? <CanvasLayer
          onRectangleComplete={this.props.onRectangleComplete}
          width={this.width}
          height={this.height}
          getScale={this.props.getScale}
        />
        :null
      }
    </BackgroundStage>;
  }
}
