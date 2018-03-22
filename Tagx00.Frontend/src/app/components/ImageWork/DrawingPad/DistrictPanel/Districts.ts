import { Notation } from "../utils/Notation";
import { computed, observable } from "mobx";
import { DistrictDrawer } from "./DistrictCanvas/DistrictDrawer";
import { lineCross } from "../ImageLib/utils";
import { Line, Point } from "../../../../models/instance/image/Shapes";


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

  isInside(point: Point) {
    const testLine = {start: point, end: {x: 0, y: point.y}};
    let inside = false;
    for (const line of this.lines()) {
      if (lineCross(line, testLine)) {
        inside = !inside;
      }
    }
    return inside;
  }

  contains(point: Point) {
    return this.points.contains(point);
  }

}

// export class DistrictUnit {
//   boundaries: Boundary[] = [];
//
//
//   get added() {
//     return this.boundaries.length >0;
//   }
//
//   addBoundary(boundary: Boundary) {
//     this.boundaries.push(boundary);
//   }
//
//
//   isInside(point: Point, width: number) {
//     const line = {start: point, end: {x: width-1, y: point.y }};
//     let inside = false;
//     for (const boundary of this.boundaries) {
//       if (boundary.cross(line)) {
//         inside = !inside;
//       }
//     }
//     return inside;
//   }
//
// }

let id =1;

export class District {
  id: number;
  boundaries: Boundary[];

  constructor(boundaries: Boundary[] = []) {
    this.id = id;
    id++;
    this.boundaries = boundaries;
  }

  get added() {
    return this.boundaries.length > 0;
  }

  addBoundary(boundary: Boundary) {
    this.boundaries.push(boundary);
  }

  isInside(point: Point) {
    return this.boundaries.find(x => x.isInside(point)) != null;
  }
}

export class DistrictNotation extends Notation {
  @observable district: District;

  constructor(district: District) {
    super();
    this.district = district;
  }

}
