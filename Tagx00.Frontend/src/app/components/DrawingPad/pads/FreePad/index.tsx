import React from "react";
import { Rectangle } from "../RectPad/Rectangle";
import { PadProps, Point } from "../PadProps";
import { Boundary, District, DistrictUnit, isCross } from "./District";

interface FreePadProps extends PadProps<District> {

  districts: District[];
}

export class FreePad extends React.Component<FreePadProps, any>{
  district: District = new District([]);
  unit: DistrictUnit = new DistrictUnit();
  boundary: Boundary = null;
  startPoint: Point;

  canvas: HTMLCanvasElement;
  imageData: ImageData;
  canvasContext: CanvasRenderingContext2D;


  getCursorPosition(e): Point {
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top
    };
  }

  storeInitialImageData = () => {
    this.imageData = this.canvasContext.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    console.log(this.imageData);
  };

  restoreInitialImageData = () => {
    this.canvasContext.putImageData(this.imageData, 0,0);
  };

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

  colorStartPoint  = (position: Point) => {
    this.canvasContext.fillRect(position.x-1, position.y-1,3,3);
  };

  onMouseDown = (e) => {
    if (this.props.drawingMode) {
      console.log("district start");
      const position = this.getCursorPosition(e);
      this.startPoint = position;
      this.storeInitialImageData();
      this.colorStartPoint(position);


      this.boundary = new Boundary();
      this.boundary.push(position);
    } else {
      this.props.onMouseClicked(this.getCursorPosition(e));
    }

  };

  drawBoundary = (boundary: Boundary) => {
    for (let i=1;i< boundary.points.length;i++) {
      this.drawLine(boundary.points[i-1], boundary.points[i]);
    }
  };

  checkCross = (start: Point, end: Point) => {
    for (const line of this.boundary.lines()) {
      if (isCross(line, { start, end })) {
        return true;
      }
    }
    return false;
  };

  onMouseMove = (e) => {
    if (this.props.drawingMode && this.boundary) {
      const position = this.getCursorPosition(e);
      const start = this.boundary.points.slice(-1)[0];
      if (this.checkCross(position, start)) {
        this.districtComplete(false);
        console.log("cross");
      } else {
        this.drawLine(start, position);
        this.boundary.push(position);
      }

    }

  };

  districtComplete = (save: boolean) => {
    this.restoreInitialImageData();

    if (save) {
      this.unit.boundaries.push(this.boundary);
    } else {
      console.log("You should end the curve at the start point.");
    }

    this.unit.boundaries.map(this.drawBoundary);

    this.boundary = null;
    console.log("boundary complete");
  };

  endsAtStartPoint = (point: Point) => {
    const error = 2;
    return Math.abs(point.x - this.startPoint.x) <= error
      && Math.abs(point.y - this.startPoint.y) <= error;
  };

  onMouseUp = (e) => {
    if (this.props.drawingMode && this.boundary) {
      const position = this.getCursorPosition(e);
      this.onMouseMove(e);
      this.districtComplete(this.endsAtStartPoint(position));
    }
  };

  ref = (ref) => {
    this.canvas = ref;
    this.canvasContext = this.canvas.getContext("2d")

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