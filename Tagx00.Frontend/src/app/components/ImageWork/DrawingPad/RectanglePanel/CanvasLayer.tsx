import React from "react"
import { Rectangle } from "./Rectangle";
import { DrawingSession } from "../utils/DrawingSession";
import { RectangleDrawer } from "./RectangleDrawer";
import { Point } from "../../../../models/instance/image/Shapes";
import { getCursorPosition } from "../utils/getCursorPosition";

interface Props {
  onRectangleComplete: (rec: Rectangle) => void;

  width: number;
  height: number;
  getScale: () => number;
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

  onMouseDown = (e) => {
    // preventTouchScroll(e);
    const position = getCursorPosition(this.canvas, e, this.props.getScale());
    this.session = new RectDrawingSession(this.canvasContext);
    this.session.saveImageData();
    this.session.start = position;
  };

  outOfCanvas(point: Point) {
    return point.x > this.props.width || point.y > this.props.height;
  }

  onMouseMove = (e) => {
    if (this.session) {
      const position = getCursorPosition(this.canvas, e, this.props.getScale());
      if (this.outOfCanvas(position)) {
        this.props.onRectangleComplete(null);
        this.finalize();
      } else {
        this.session.putImageData();
        this.session.end = position;
        this.drawer.drawRectangle(this.session.rectangle,"#000000");
      }

    }

  };

  finalize() {
    this.session.putImageData();
    this.session = null;
  }

  onMouseUp = (e) => {
    if (this.session) {
      this.onMouseMove(e);
      this.props.onRectangleComplete(this.session.rectangle);
      this.finalize();

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
      style={{position: "absolute", touchAction: "None"}}
      ref={this.ref}
      width={this.props.width}
      height={this.props.height}
      onMouseDown={this.onMouseDown}
      onMouseMove={this.onMouseMove}
      onMouseUp={this.onMouseUp}
      onTouchStart={this.onMouseDown}
      onTouchMove={this.onMouseMove}
      onTouchEnd={this.onMouseUp}
    >
    </canvas>;
  }
}
