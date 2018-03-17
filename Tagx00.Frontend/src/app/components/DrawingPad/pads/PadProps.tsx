import { Rectangle } from "./RectPad/Rectangle";

export interface Point {
  x: number;
  y: number;
}

export interface PadProps<T> {
  drawingMode: boolean;
  onDrawComplete: (rec: T) => void;
  width: number;
  height: number;
  onMouseClicked: (point: Point) => void;

}