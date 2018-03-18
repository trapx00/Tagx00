import { Line, Point } from "../../ImageLib/Shapes";
import { Stack } from "../../../../../utils/Stack";
import { Boundary } from "../Districts";

export class DistrictDrawer {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.width = context.canvas.clientWidth;
    this.height = context.canvas.clientHeight;
  }

  drawArea(boundary: Line[], color: string) {
    this.context.save();
    this.context.fillStyle = color;
    this.context.beginPath();
    for (const line of boundary) {

    }
  }


  drawPoint(point: Point, color: string) {
    this.context.save();
    this.context.strokeStyle = color;
    this.context.rect(point.x, point.y, 1,1);
    this.context.stroke();
    this.context.restore();

  }

  drawBoundary = (boundary: Boundary, color: string) => {
    this.context.save();
    this.context.globalCompositeOperation = 'source-over';
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
    this.context.strokeStyle = color;
    this.context.beginPath();
    const {x, y} = boundary.points[0];
    this.context.moveTo(x,y);

    for (const line of boundary.lines()) {
      this.context.lineTo(line.start.x, line.start.y);
    }

    this.context.closePath();
    this.context.stroke();
    this.context.restore();
  };

  fillBoundary = (boundary: Boundary, color: string)  => {
    this.fillPolygon(boundary.points, color);
  };

  fillPolygon(points: Point[], color: string) {
    this.context.save();
    this.context.beginPath();
    const {x,y} = points[0];
    this.context.moveTo(x, y);
    for (const line of points) {
      this.context.lineTo(line.x, line.y);
    }
    this.context.closePath();
    this.context.fillStyle = color;
    this.context.fill();
    this.context.restore();
  }



  drawLine(start: Point, end: Point, color: string) {
    this.context.save();
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
    this.context.beginPath();
    this.context.globalCompositeOperation = 'source-over';
    this.context.strokeStyle = color;
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.closePath();
    this.context.stroke();
    this.context.restore();
  };



}
