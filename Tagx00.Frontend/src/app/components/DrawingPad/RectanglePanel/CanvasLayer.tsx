import React from "react"
import { Rectangle } from "./Rectangle";
import { DrawingSession } from "../utils/DrawingSession";
import { Point } from "../ImageLib/Shapes";
import { RectangleDrawer } from "./RectangleDrawer";

interface Props {
  onRectangleComplete: (rec: Rectangle) => void;

  width: number;
  height: number;
}

let id = 1;

class RectDrawingSession extends DrawingSession {
  rectangle: Rectangle;

  set start(point: Point) {
    this.rectangle.start = point;
  }

  set end(point: Point) {
    this.rectangle.end = point;
  }

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.rectangle = new Rectangle({id});
    id++;
  }


}

export class CanvasLayer extends React.Component<Props, {}> {

  session: RectDrawingSession;
  drawer: RectangleDrawer;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;

  getCursorPosition(e): Point {
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top
    };
  }

  onMouseDown = (e) => {
    const position = this.getCursorPosition(e);
    this.session = new RectDrawingSession(this.canvasContext);
    this.session.saveImageData();
    this.session.start = position;

  };

  onMouseMove = (e) => {
    if (this.session) {
      const position = this.getCursorPosition(e);
      this.session.putImageData();
      this.session.end = position;
      this.drawer.drawRectangle(this.session.rectangle,"#000000");
    }

  };

  onMouseUp = (e) => {
    if (this.session) {
      this.onMouseMove(e);
      this.props.onRectangleComplete(this.session.rectangle);
      this.session.putImageData();
      this.session = null;

    }
  };

  ref = (ref) => {
    this.canvas = ref;
    if (ref) {
      this.canvasContext = this.canvas.getContext("2d");
      // this.session = new RectDrawingSession(this.canvasContext);
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
      onMouseMove={this.onMouseMove}
      onMouseUp={this.onMouseUp}
    >
    </canvas>;
  }
}
