import * as React from "react";
import {Tool} from "../../Tool";

export class RectangleTool implements Tool {
  rectangle = null;
  imageData = null;
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  onMouseDown = (x, y) => {
    this.rectangle = {
      id: Math.random(),
      start: { x, y },
      end: null
    };
    this.imageData =
      this.context.getImageData(
        0,
        0,
        this.context.canvas.clientWidth,
        this.context.canvas.clientHeight
      );
  };

  drawRectangle = (item, mouseX, mouseY) => {
    const startX = mouseX < item.start.x ? mouseX : item.start.x;
    const startY = mouseY < item.start.y ? mouseY : item.start.y;
    const widthX = Math.abs(item.start.x - mouseX);
    const widthY = Math.abs(item.start.y - mouseY);

    this.context.beginPath();
    this.context.lineWidth = item.size;
    this.context.strokeStyle = item.color;
    this.context.fillStyle = item.fill;
    this.context.rect(startX, startY, widthX, widthY);
    this.context.stroke();
    if (item.fill) {
      this.context.fill();
    }
  };

  onMouseMove = (x, y) => {
    if (!this.rectangle) return;
    this.context.putImageData(this.imageData, 0, 0);
    this.context.save();
    this.drawRectangle(this.rectangle, x, y);
    this.context.restore();
  };

  onMouseUp = (x, y) => {
    if (!this.rectangle) return null;
    this.onMouseMove(x, y);
    const item = this.rectangle;
    this.imageData = null;
    this.rectangle = null;
    item.end = { x, y };
    this.context.save();
    return [item];
  };

  draw = item => this.drawRectangle(item, item.end.x, item.end.y);
}

