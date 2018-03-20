import React from "react";
import { Line, Point } from "../../ImageLib/Shapes";
import { observer } from "mobx-react";
import { DistrictDrawingSession, Step } from "./DistrictDrawingSession";
import { DistrictDrawer } from "./DistrictDrawer";

interface CanvasProps {
  width: number;
  height: number;

  session: DistrictDrawingSession;
}

@observer
export class CanvasLayer extends React.Component<CanvasProps, {}> {
  drawer: DistrictDrawer;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;


  getCursorPosition(e): Point {
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: Math.trunc(e.clientX - left),
      y: Math.trunc(e.clientY - top)
    };
  }


  colorStartPoint = (position: Point) => {
    this.canvasContext.fillRect(position.x - 1, position.y - 1, 3, 3);
  };

  checkCross = (line: Line) => {
    return this.props.session.boundary.cross(line);
  };

  boundaryComplete = (save: boolean) => {
    this.props.session.putImageData();
    this.props.session.boundaryComplete(save);
    this.refillAllBoundaries();

  };

  refillAllBoundaries() {
    this.canvasContext.clearRect(0,0, this.props.width, this.props.height);
    this.props.session.district.boundaries.forEach((x) => this.drawer.fillBoundary(x, "rgba(255,0,0,0.4)"))
  }

  endsAtStartPoint = (point: Point) => {
    const error = 2;
    return Math.abs(point.x - this.props.session.startPoint.x) <= error
      && Math.abs(point.y - this.props.session.startPoint.y) <= error;
  };

  onMouseDown = (e) => {
    const position = this.getCursorPosition(e);
    if (this.props.session.canContinueDrawing) {
      this.colorStartPoint(position);
      this.props.session.startDrawingBoundary(position);
    }

  };

  onMouseMove = (e) => {
    if (this.props.session.step === Step.DrawingBoundary) {
      const position = this.getCursorPosition(e);
      const start = this.props.session.boundary.points.slice(-1)[0];
      if (this.checkCross({start, end: position})) {
        this.boundaryComplete(false);
        console.log("cross");
      } else {
        this.drawer.strokeLine(start, position,"#000000");
        this.props.session.boundary.push(position);
      }

    }

  };

  onMouseUp = (e) => {
    const position = this.getCursorPosition(e);
    if (this.props.session.step === Step.DrawingBoundary) {

      if (this.endsAtStartPoint(position)) {
        this.props.session.boundary.push(this.props.session.startPoint); // last point
        this.boundaryComplete(true);
      } else {
        this.boundaryComplete(false);
      }

    }
  };

  ref = (ref) => {
    this.canvas = ref;
    if (ref) {
      this.canvasContext = this.canvas.getContext("2d");

      this.drawer = new DistrictDrawer(this.canvasContext);
      this.props.session.init(this.canvasContext);
      this.props.session.saveImageData();

      this.forceUpdate();
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
