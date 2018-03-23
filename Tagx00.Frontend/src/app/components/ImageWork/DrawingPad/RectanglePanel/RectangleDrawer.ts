import { Rectangle } from "./Rectangle";

export class RectangleDrawer {
  context: CanvasRenderingContext2D;


  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  drawRectangle(rec: Rectangle, color: string) {
    this.context.save();
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.rect(rec.x, rec.y, rec.width, rec.height);
    this.context.stroke();
    this.context.restore();
  }
}
