import React from "react";
import { PadProps, Point } from "../../PadProps";
import { Boundary, District, DistrictUnit, lineCross } from "../Shapes";
import { observer } from "mobx-react";
import { BackgroundStage } from "../../BackgroundStage";
import { action, observable } from "mobx";
import { DistrictDrawingSession, SessionStep } from "./DistrictDrawingSession";
import { Terminal } from "./Terminal";

interface FreePadProps {

  drawingMode: boolean;
  districts: District[];
  onDistrictComplete: (dis: District) => void;
  onDistrictClicked: (dis: District) => void;
  imgUrl: string;
}


@observer
export class DistrictCanvas extends React.Component<FreePadProps, {}> {

  @observable width: number;
  @observable height: number;

  session: DistrictDrawingSession;

  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;


  getCursorPosition(e): Point {
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top
    };
  }

  drawPoint = (point: Point, color: string) => {
    this.canvasContext.fillStyle = color;
    this.canvasContext.rect(point.x, point.y,1,1);
    this.canvasContext.fill();
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

  drawBoundary = (boundary: Boundary) => {
    for (let line of boundary.lines()) {
      this.drawLine(line.start, line.end);
    }
  };

  drawDistrict = (dis: District) => {

  };

  drawDistrictUnit = (unit: DistrictUnit) => {
    for (let x=0;x<this.width;x++) {
      for (let y=0;y<this.height;y++) {
        const p = {x,y};
        if (unit.isInside(p)) {
          this.drawPoint(p, "#90caf9");
        }
      }
    }
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
    if (this.props.drawingMode) {
      const position = this.getCursorPosition(e);
      if (this.session.canContinueDrawing) {
        this.session.saveImageData();

        this.colorStartPoint(position);
        this.session.startDrawingBoundary(position);

      }
    }

  };

  onMouseMove = (e) => {
    if (this.props.drawingMode && this.session && this.session.step === SessionStep.DrawingBoundary) {
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
    if (this.props.drawingMode) {
      const position = this.getCursorPosition(e);
      if (this.session.step === SessionStep.DrawingBoundary) {

        this.onMouseMove(e);
        this.boundaryComplete(this.endsAtStartPoint(position));
      } else { //step2 : select area
        const unit = this.session.selectArea(position);
        this.drawDistrictUnit(unit);
      }

    }
  };

  @action onBackgroundImageLoaded = (width, height) => {
    this.height = height;
    this.width = width;
  };

  onDistrictComplete = () => {
    this.props.onDistrictComplete(this.session.district);
  };

  ref = (ref) => {
    this.canvas = ref;
    this.canvasContext = this.canvas.getContext("2d")

  };



  renderAllDistricts = () => {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.props.districts.forEach(this.drawDistrict);
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.drawingMode) {
      this.session = new DistrictDrawingSession(this.canvasContext);
    } else {
      this.session = null;
    }
  }

  componentDidUpdate() {

    this.renderAllDistricts();
  }

  componentDidMount() {
    this.renderAllDistricts();
  }

  render() {
    return <div>
      <BackgroundStage imageUrl={this.props.imgUrl}
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

      </BackgroundStage>


      {this.session
      ? <Terminal session={this.session}/>
        : null
      }

      {this.props.drawingMode
        ? <button onClick={this.onDistrictComplete}>提交区域</button>
        : null
      }
    </div>
  }
}