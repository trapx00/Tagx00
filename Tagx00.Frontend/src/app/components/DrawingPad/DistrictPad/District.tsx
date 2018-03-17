import { Point } from "../PadProps";

export interface Line {
  start: Point;
  end: Point;
}

export class Boundary {
  points: Point[] = [];

  lines = function*() {
    for (let i =1;i<this.points.length;i++) {
      yield { start: this.points[i-1], end: this.points[i]};
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



export function lineCross(line1: Line, line2: Line): boolean {
//线段ab的法线N1

  const a = line1.end, b=line1.start, c=line2.end, d=line2.start;

  const nx1 = (b.y - a.y), ny1 = (a.x - b.x);

  //线段cd的法线N2
  const nx2 = (d.y - c.y), ny2 = (c.x - d.x);

  //两条法线做叉乘, 如果结果为0, 说明线段ab和线段cd平行或共线,不相交
  const denominator = nx1 * ny2 - ny1 * nx2;
  if (denominator==0) {
    return false;
  }

  //在法线N2上的投影
  const distC_N2 = nx2 * c.x + ny2 * c.y;
  const distA_N2 = nx2 * a.x + ny2 * a.y - distC_N2;
  const distB_N2 = nx2 * b.x + ny2 * b.y - distC_N2;

  // 点a投影和点b投影在点c投影同侧 (对点在线段上的情况,本例当作不相交处理);
  if ( distA_N2*distB_N2>=0  ) {
    return false;
  }

  //
  //判断点c点d 和线段ab的关系, 原理同上
  //
  //在法线N1上的投影
  const distA_N1 = nx1 * a.x + ny1 * a.y;
  const distC_N1 = nx1 * c.x + ny1 * c.y - distA_N1;
  const distD_N1 = nx1 * d.x + ny1 * d.y - distA_N1;
  return distC_N1 * distD_N1 < 0;


}

export class DistrictUnit {
  boundaries: Boundary[] =[];
  innerPoint: Point;

  isInside(point: Point) {
    const line = { start: this.innerPoint, end: point};
    for (const boundary of this.boundaries) {
      if (boundary.cross(line)) {
        return false;
      }
    }
    return true;
  }

  // points: Point[] = [];
  //
  // public populatePoints(width: number, height: number) {
  //   const map: number[][] = [];
  //   for (let i=0;i<width;i++) {
  //     const l = [];
  //     for (let j=0;i<height;j++) {
  //       l.push(0);
  //     }
  //     map.push(l);
  //   }
  //   this.populatePointsRec(this.innerPoint, map);
  // }
  //
  // private populatePointsRec(point: Point, map: number[][]) {
  //   if (map[point.x][point.y] == 1) {
  //     return;
  //   }
  //   map[point.x][point.y] = 1;
  //   if (this.boundaries.find(x => x.contains(point))) {
  //     return;
  //   } else {
  //     this.populatePointsRec({x: point.x, y: point.y+1}, map);
  //     this.populatePointsRec({x: point.x, y: point.y-1},map);
  //     this.populatePointsRec({x: point.x+1, y: point.y},map);
  //     this.populatePointsRec({x: point.x-1, y: point.y},map);
  //   }
  // }

}

export class District {
  districts: DistrictUnit[];


  constructor(districts: DistrictUnit[]) {
    this.districts = districts;
  }

  addUnit(unit: DistrictUnit) {
    this.districts.push(unit);
  }

  isInside(point: Point) {
    return !!this.districts.find(x => x.isInside(point));
  }
}