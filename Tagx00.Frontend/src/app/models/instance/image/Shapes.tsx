
export interface Line {
  start: Point;
  end: Point;
}



export interface Point {
  x: number;
  y: number;
}

export function pointEquals(p1: Point, p2: Point) {
  return p1.x == p2.x && p1.y == p2.y;
}

