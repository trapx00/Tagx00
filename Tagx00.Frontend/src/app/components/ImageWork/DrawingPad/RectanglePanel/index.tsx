import React from "react";
// import {RectangleTool} from "./Tools/Rectangle";
import { Rectangle } from "./Rectangle";
import { RectangleNotation } from "./RectangleNotation";
import { RectangleCanvasContainer } from "./RectangleCanvasContainer";
import { PartJobTuple } from "../../../../models/instance/image/job/PartJob";
import { pointEquals } from "../../../../models/instance/image/Shapes";

interface Props {
  imageUrl: string;
  tuples: PartJobTuple[];
  onDrawComplete: (tuple: PartJobTuple) => void;
  addingMode: boolean;
  onTupleSelected: (tuple: PartJobTuple) => void;
  selectedTuple: PartJobTuple;
  onImageLoaded: (width: number, height: number) => void;
  getScale: ()=>number;
}



function tupleAndNotationPointsToTheSameRect(tuple: PartJobTuple, notation: RectangleNotation) {

  return pointEquals(tuple.leftTopPoint, notation.rectangle.leftTop)
  || pointEquals(tuple.rightBottomPoint, notation.rectangle.rightBottom);
}

export class RectanglePanel extends React.Component<Props, {}> {

  onDrawComplete = (rectangle: Rectangle) => {
    if (rectangle) {
      this.props.onDrawComplete({
        leftTopPoint: rectangle.leftTop,
        rightBottomPoint: rectangle.rightBottom,
        tagDescriptionTuple: {
          tagTuples: [],
          descriptions: []
        }
      });
    } else {
      this.props.onDrawComplete(null);
    }

  };

  onRecClicked = (rec: RectangleNotation) => {
    const selectedTuple = this.props.tuples.find(x => tupleAndNotationPointsToTheSameRect(x, rec));
    if (selectedTuple) {
      this.props.onTupleSelected(selectedTuple);
    }
  };



  render() {
    const notations = this.props.tuples.map(x => new RectangleNotation(new Rectangle({
      start: x.leftTopPoint, end: x.rightBottomPoint
    })));

    const selectedNotation = this.props.selectedTuple ?
      notations.find(x => tupleAndNotationPointsToTheSameRect(this.props.selectedTuple,x))
      : null;

    return <div>
      <RectangleCanvasContainer
        drawingMode={this.props.addingMode}
        onRectangleComplete={this.onDrawComplete}
        onRectangleClicked={this.onRecClicked}
        rectangles={notations}
        selectedRectangle={selectedNotation}
        imageUrl={this.props.imageUrl}
        onImageLoaded={this.props.onImageLoaded}
        getScale={this.props.getScale}
        />
    </div>;
  }

}
