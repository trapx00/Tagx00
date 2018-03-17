import * as React from "react";
import { Rectangle } from "./Rectangle";
import { PadProps, Point } from "../PadProps";
// import { RectangleTool } from "./Tools/Rectangle";


interface RectPadProps extends PadProps<Rectangle> {
  rectangles: Rectangle[];
}

export class RectPad extends React.Component<RectPadProps, any> {


  rectangle: Rectangle = null;
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


  onMouseDown = (e) => {
    if (this.props.drawingMode) {
      console.log("rec start");
      const position = this.getCursorPosition(e);
      this.rectangle = new Rectangle();
      this.storeInitialImageData();
      this.rectangle.start = position;
    } else {
      this.props.onMouseClicked(this.getCursorPosition(e));
    }

  };

  onMouseMove = (e) => {
    if (this.props.drawingMode && this.rectangle) {
      const position = this.getCursorPosition(e);
      this.restoreInitialImageData();
      this.rectangle.end = position;
      this.drawRectangle(this.rectangle);
    }

  };

  onMouseUp = (e) => {
    if (this.props.drawingMode && this.rectangle) {
      this.onMouseMove(e);
      this.props.onDrawComplete(this.rectangle);
      this.rectangle = null;
      this.restoreInitialImageData();
    }
  };

  ref = (ref) => {
    this.canvas = ref;
    this.canvasContext = this.canvas.getContext("2d")

  };

  renderAllRectangles = () => {
    this.canvasContext.clearRect(0,0,this.props.width, this.props.height);
    console.log(this.props.rectangles);
    this.props.rectangles.forEach(this.drawRectangle);
  };

  componentDidUpdate() {
    this.renderAllRectangles();
  }

  componentDidMount() {
    this.renderAllRectangles();
  }




  drawRectangle = (rec: Rectangle) => {
    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = rec.color;
    this.canvasContext.rect(rec.x, rec.y, rec.width, rec.height);
    this.canvasContext.stroke();
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
