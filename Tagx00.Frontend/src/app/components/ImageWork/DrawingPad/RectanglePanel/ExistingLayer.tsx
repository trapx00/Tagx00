import React from "react";
import { RectangleDrawer } from "./RectangleDrawer";
import { RectangleNotation } from "./RectangleNotation";
import { Point } from "../../../../models/instance/image/Shapes";

interface Props {
  rectangles: RectangleNotation[];
  selectedRectangle: RectangleNotation;
  width: number;
  height: number;
  onRectangleClicked: (rec: RectangleNotation) => void;
}

export class ExistingLayer extends React.Component<Props, any> {

  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  drawer: RectangleDrawer;

  findClickedRectangle = (position: Point) => {
    return this.props.rectangles.find(x => x.rectangle.isOnSides(position));
  };

  renderAllRectangles = () => {
    this.canvasContext.clearRect(0, 0, this.props.width, this.props.height);
    this.props.rectangles.forEach(x => {
      if (x === this.props.selectedRectangle) {
        this.drawer.drawRectangle(x.rectangle, "#FF0000");
      } else {
        this.drawer.drawRectangle(x.rectangle, "#000000");
      }
    });
  };

  componentDidUpdate() {
    this.renderAllRectangles();
  }

  componentDidMount() {
    this.renderAllRectangles();
  }

  getCursorPosition(e): Point {
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top
    };
  }

  onMouseDown = (e) => {
    const position = this.getCursorPosition(e);
    const selected = this.findClickedRectangle(position);
    if (selected) {
      this.props.onRectangleClicked(selected);
    }
  };

  ref = (ref) => {
    this.canvas = ref;
    if (ref) {
      this.canvasContext = this.canvas.getContext("2d");
      this.drawer = new RectangleDrawer(this.canvasContext);
    }

  };

  render() {
    return <canvas
      style={{position: "absolute"}}
      ref={this.ref}
      width={this.props.width}
      height={this.props.height}
      onMouseDown={this.onMouseDown}
      />;
  }
}
