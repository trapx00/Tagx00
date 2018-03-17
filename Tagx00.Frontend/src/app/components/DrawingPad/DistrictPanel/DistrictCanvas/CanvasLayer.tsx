import React from "react";
import { lineCross, Point } from "../../ImageLib/Shapes";
import { observer } from "mobx-react";
import { BackgroundStage } from "../../BackgroundStage";
import { DistrictDrawingSession, Step } from "./DistrictDrawingSession";
import { Terminal } from "../Terminal";
import { Stack } from "../../../../../utils/Stack";
import { DistrictDrawer } from "./Drawer";
import { Boundary, District, DistrictUnit } from "../Districts";

interface CanvasProps {
  onDistrictComplete: (dis: District) => void;
  width: number;
  height: number;
}


export class CanvasLayer extends React.Component<CanvasProps, {}> {
  session: DistrictDrawingSession;
  drawer: DistrictDrawer;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;


  getCursorPosition(e): Point {
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top
    };
  }

  drawLine = (start: Point, end: Point) => {
    this.canvasContext.lineJoin = 'round';
    this.canvasContext.lineCap = 'round';
    this.canvasContext.beginPath();
    this.canvasContext.globalCompositeOperation = 'source-over';
    this.canvasContext.moveTo(start.x, start.y);
    this.canvasContext.lineTo(end.x, end.y);
    this.canvasContext.closePath();
    this.canvasContext.stroke();
  };

  drawBoundary = (boundary: Boundary) => {

    for (let line of boundary.lines()) {
      console.log(line);
      this.drawLine(line.start, line.end);
    }
  };



  drawDistrictUnit = (unit: DistrictUnit) => {
    this.drawer.fillArea(unit.densifiedBoundaryMap, unit.innerPoint, "#692045")
  };

  colorStartPoint = (position: Point) => {
    this.canvasContext.fillRect(position.x - 1, position.y - 1, 3, 3);
  };

  checkCross = (start: Point, end: Point) => {
    return this.session.boundary.cross({start, end});
  };

  boundaryComplete = (save: boolean) => {
    this.session.putImageData();
    this.session.boundaryComplete(save);
    this.session.unit.boundaries.forEach(this.drawBoundary);

  };

  endsAtStartPoint = (point: Point) => {
    const error = 2;
    return Math.abs(point.x - this.session.startPoint.x) <= error
      && Math.abs(point.y - this.session.startPoint.y) <= error;
  };

  onMouseDown = (e) => {
    const position = this.getCursorPosition(e);
    if (this.session.canContinueDrawing) {
      this.session.saveImageData();

      this.colorStartPoint(position);
      this.session.startDrawingBoundary(position);

    }


  };

  onMouseMove = (e) => {
    if (this.session.step === Step.DrawingBoundary) {
      const position = this.getCursorPosition(e);
      const start = this.session.boundary.points.slice(-1)[0];
      if (this.checkCross(position, start)) {
        this.boundaryComplete(false);
        console.log("cross");
      } else {
        this.drawLine(start, position);
        this.session.boundary.push(position);
      }

    }

  };

  onMouseUp = (e) => {
    const position = this.getCursorPosition(e);
    if (this.session.step === Step.DrawingBoundary) {

      this.onMouseMove(e);
      this.boundaryComplete(this.endsAtStartPoint(position));
    } else if (this.session.step === Step.SelectingArea) { //step : select area
      const unit = this.session.selectArea(position);
      this.drawDistrictUnit(unit);
    }
  };


  onDistrictComplete = () => {
    this.props.onDistrictComplete(this.session.district);
  };

  ref = (ref) => {
    this.canvas = ref;
    this.canvasContext = this.canvas.getContext("2d");
    this.session = new DistrictDrawingSession(this.canvasContext);
    this.drawer = new DistrictDrawer(this.canvasContext);
    this.forceUpdate();
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
