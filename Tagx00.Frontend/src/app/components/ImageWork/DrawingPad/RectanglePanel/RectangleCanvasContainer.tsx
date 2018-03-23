import { Rectangle } from "./Rectangle";
import React from "react";
import { BackgroundStage } from "../utils/BackgroundStage";
import { ExistingLayer } from "./ExistingLayer";
import { CanvasLayer } from "./CanvasLayer";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { RectangleNotation } from "./RectangleNotation";
import { PartJobTuple } from "../../../../models/instance/image/job/PartJob";

interface Props {
  drawingMode: boolean;
  onRectangleComplete: (rec: Rectangle) => void;
  onRectangleClicked: (rec: RectangleNotation) => void;
  selectedRectangle: RectangleNotation;
  rectangles: RectangleNotation[];
  imageUrl: string;
}

@observer
export class RectangleCanvasContainer extends React.Component<Props,{}> {
  @observable width: number;
  @observable height: number;

  @action onBackgroundImageLoaded = (width, height) => {
    this.width = width;
    this.height = height;
  };


  render() {
    return <BackgroundStage imageUrl={this.props.imageUrl}
                     onImageLoaded={this.onBackgroundImageLoaded}>
      <ExistingLayer rectangles={this.props.rectangles}
                     width={this.width}
                     height={this.height}
                     onRectangleClicked={this.props.onRectangleClicked}
                     selectedRectangle={this.props.selectedRectangle}
      />
      {this.props.drawingMode
        ? <CanvasLayer
          onRectangleComplete={this.props.onRectangleComplete}
          width={this.width}
          height={this.height}/>
        :null
      }
    </BackgroundStage>;
  }
}
