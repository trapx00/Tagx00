import React from "react";
import { Rectangle } from "./Rectangle";
import { Point } from "../ImageLib/Shapes";
import { Drawer } from "./Drawer";

interface Props {
  rectangles: Rectangle[];
  width: number;
  height: number;
  onRectangleClicked: (rec: Rectangle) => void;
}

export class ExistingLayer extends React.Component<Props, any> {

  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  drawer: Drawer;

  findClickedRectangle = (position: Point) => {
    return this.props.rectangles.find(x => x.isOnSides(position));
  };

  renderAllRectangles = () => {
    this.canvasContext.clearRect(0, 0, this.props.width, this.props.height);
    this.props.rectangles.forEach(x => this.drawer.drawRectangle(x));
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
    this.canvasContext = this.canvas.getContext("2d");
    this.drawer = new Drawer(this.canvasContext);
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
