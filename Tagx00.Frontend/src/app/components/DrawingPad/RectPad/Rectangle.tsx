export interface Point {
  x: number;
  y: number;
}

export class Rectangle {
  start: Point = {x: 0, y: 0};
  end: Point = {x: 0, y: 0};
  color: string = "#000000";

  constructor(params: Partial<Rectangle> = {}) {
    Object.assign(this, params);
  }

  get width() {
    return Math.abs(this.end.x-this.start.x);
  }

  get height() {
    return Math.abs(this.end.y - this.start.y);
  }

  get x() {
    return Math.min(this.start.x, this.end.x);
  }

  get y() {
    return Math.min(this.start.y, this.end.y);
  }

}
