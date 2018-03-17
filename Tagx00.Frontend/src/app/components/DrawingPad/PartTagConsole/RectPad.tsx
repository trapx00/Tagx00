import * as React from "react";
import { Rectangle } from "./Rectangle";
import { PadProps, Point } from "../PadProps";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { BackgroundStage } from "../BackgroundStage";

interface RectPadProps {
  drawingMode: boolean;
  onDrawComplete: (rec: Rectangle) => void;
  onRectangleClicked: (rec: Rectangle) => void;
  rectangles: Rectangle[];
  imgUrl: string;
}

let id = 1;

class DrawingSession {
  rectangle: Rectangle;
  imageData: ImageData;

  set start(point: Point) {
    this.rectangle.start = point;
  }

  set end(point: Point) {
    this.rectangle.end = point;
  }

  constructor() {
    this.rectangle = new Rectangle({id});
    id++;
  }


}

@observer
export class RectPad extends React.Component<RectPadProps, any> {

  @observable height: number = 200;
  @observable width: number = 200;

  session: DrawingSession;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;

  getCursorPosition(e): Point {
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top
    };
  }

  storeInitialImageData = () => {
    this.session.imageData = this.canvasContext.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  };

  restoreInitialImageData = () => {
    this.canvasContext.putImageData(this.session.imageData, 0, 0);
  };

  findClickedRectangle = (position: Point) => {
    return this.props.rectangles.find(x => x.isOnSides(position));
  };


  onMouseDown = (e) => {
    const position = this.getCursorPosition(e);
    if (this.props.drawingMode) {
      console.log("rec start");
      this.session = new DrawingSession();
      this.storeInitialImageData();
      this.session.start = position;
    } else {
      const selected = this.findClickedRectangle(position);
      if (selected) {
        this.props.onRectangleClicked(selected);
      }
    }

  };

  onMouseMove = (e) => {
    if (this.props.drawingMode && this.session) {
      const position = this.getCursorPosition(e);
      this.restoreInitialImageData();
      this.session.end = position;
      this.drawRectangle(this.session.rectangle);
    }

  };

  onMouseUp = (e) => {
    if (this.props.drawingMode && this.session) {
      this.onMouseMove(e);
      this.props.onDrawComplete(this.session.rectangle);
      this.restoreInitialImageData();
      this.session = null;

    }
  };

  ref = (ref) => {
    this.canvas = ref;
    this.canvasContext = this.canvas.getContext("2d")

  };

  renderAllRectangles = () => {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    console.log(this.props.rectangles);
    this.props.rectangles.forEach(this.drawRectangle);
  };

  componentDidUpdate() {
    this.renderAllRectangles();
  }

  componentDidMount() {
    this.renderAllRectangles();
  }


  @action onBackgroundImageLoaded = (width, height) => {
    this.height = height;
    this.width = width;
  };

  drawRectangle = (rec: Rectangle) => {
    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = rec.color;
    this.canvasContext.rect(rec.x, rec.y, rec.width, rec.height);
    this.canvasContext.stroke();
  };

  render() {

    return <BackgroundStage imageUrl={this.props.imgUrl}
                            onImageLoaded={this.onBackgroundImageLoaded}
                            width={this.width}
                            height={this.height}>
      <canvas
        style={{position: "absolute"}}
        ref={this.ref}
        width={this.width}
        height={this.height}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
      </canvas>
    </BackgroundStage>;
  }
}
