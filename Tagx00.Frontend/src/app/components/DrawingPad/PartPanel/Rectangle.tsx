import { Point } from "../ImageLib/Shapes";

export class Rectangle {
  id: number;
  start: Point = {x: 0, y: 0};
  end: Point = {x: 0, y: 0};
  color: string = "#000000";

  constructor(params: Partial<Rectangle> = {}) {
    Object.assign(this, params);
  }

  get width() {
    return Math.abs(this.end.x - this.start.x);
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

  isOnSides(point: Point) {
    const error = 5;
    const leftUpper = {
      x: this.x, y: this.y
    };
    const rightUpper = {
      x: this.x + this.width, y: this.y
    };
    const leftDown = {
      x: this.x, y: this.y + this.height
    };

    const rightDown = {
      x: this.x + this.width, y: this.y + this.height
    };

    return (Math.abs(point.y - leftUpper.y) <= error && point.x - leftUpper.x <= this.width)
      || (Math.abs(point.y - leftDown.y) <= error && point.x - leftDown.x <= this.width)
      || (Math.abs(point.x - leftUpper.x) <= error && point.y - leftUpper.y <= this.height)
      || (Math.abs(point.x - rightDown.x) <= error && point.y - rightUpper.y <= this.height);

  }
}
