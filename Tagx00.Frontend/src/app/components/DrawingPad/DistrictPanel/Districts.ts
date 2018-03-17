import { ImageMap, Line, lineCross, Point } from "../ImageLib/Shapes";

function forEachOrderly(number1: number, number2: number, fn: (num: number) => void) {
  number1 = Math.trunc(number1);
  number2 = Math.trunc(number2);

  if (number1 < number2) {
    for (let i = number1; i <= number2; i++) {
      fn(i);
    }
  } else {
    for (let i = number1; i >= number2; i--) {
      fn(i);
    }
  }
}


export class Boundary {
  points: Point[] = [];
  lines = function* () {
    for (let i = 1; i < this.points.length; i++) {
      yield {start: this.points[i - 1], end: this.points[i]};
    }
  };


  push(point: Point) {
    this.points.push(point);
  }

  cross(other: Line) {
    for (const line of this.lines()) {
      if (lineCross(line, other)) {
        return true;
      }
    }
    return false;
  }

  contains(point: Point) {
    return this.points.contains(point);
  }

}
export class DistrictUnit {
  boundaries: Boundary[] = [];
  innerPoint: Point;

  densifiedBoundaryMap: ImageMap;

  constructor(width: number, height: number) {
    this.densifiedBoundaryMap = new ImageMap(width, height);
  }

  get added() {
    return this.boundaries.length >1;
  }

  addBoundary(boundary: Boundary) {
    this.boundaries.push(boundary);
    for (let i = 1; i < boundary.points.length; i++) {
      const point1 = boundary.points[i - 1];
      const point2 = boundary.points[i];
      if (point1.x == point2.x) { //vertical(delta x=0), fill all inner points
        forEachOrderly(point1.y, point2.y, y => {
          this.densifiedBoundaryMap.set(point1.x, y,1);
        })
      } else { // delta x not zero. use triangle
        const factor = (point2.y - point1.y) / (point2.x - point1.x);
        forEachOrderly(point1.x, point2.x, x => {
          const y = Math.trunc((x - point1.x) * factor + point1.y);
          this.densifiedBoundaryMap.set(x, y,1);
        });
      }
    }
  }


  isInside(point: Point) {
    const line = {start: this.innerPoint, end: point};
    for (const boundary of this.boundaries) {
      if (boundary.cross(line)) {
        return false;
      }
    }
    return true;
  }

}

export class District {
  districts: DistrictUnit[] = [];

  isInside(point: Point) {
    return !!this.districts.find(x => x.isInside(point));
  }
}
