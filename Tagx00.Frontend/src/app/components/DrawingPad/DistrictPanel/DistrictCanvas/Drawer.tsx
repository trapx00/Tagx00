import { ImageMap, Line, Point } from "../../ImageLib/Shapes";
import { Stack } from "../../../../../utils/Stack";

type Boundary = Point[];


const offsets = [
  [-1,0],
  [0,1],
  [1,0],
  [0,-1]
];

export class DistrictDrawer {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.width = context.canvas.clientWidth;
    this.height = context.canvas.clientHeight;
  }

  mapize(b: Boundary): ImageMap {
    const map = new ImageMap(this.width, this.height);
    for (const p of b) {
      map.set(p.x, p.y,1);
    }
    return map;
  }

  mergeBoundariesIntoOneMap(boundaries: Boundary[]) {

    const maps = boundaries.map(x => this.mapize(x));

    const array = [];
    for (let x = 0;x<this.width;x++) {
      const inner = [];
      for (let y = 0; y < this.height; y++) {
        inner.push(maps.reduce((prev, curr) => prev || curr, 0));
      }
      array.push(inner);
    }
    return array;

  }

  private fillAreaRec(map: ImageMap, point: Point, color: string) {
    // 1 for boundary, 2 for colored, 0 for not processed
    const { x,y } = point;
    if (map.get(x,y) == 0) {
      this.drawPoint(point, color);
      map.set(x,y,2);
      for (const offset of offsets) {
        this.fillAreaRec(map, {x: x+offset[0], y: y+offset[1]}, color);
      }
    }
  }

  fillArea(map: ImageMap, point: Point, color: string) {
    this.fillAreaRec(map, point, color);
  }

  drawPoint(point: Point, color: string) {
    this.context.save();
    this.context.strokeStyle = color;
    this.context.rect(point.x, point.y, 1,1);
    this.context.stroke();
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
