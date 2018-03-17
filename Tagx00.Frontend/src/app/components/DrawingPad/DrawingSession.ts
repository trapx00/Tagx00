;

export class DrawingSession {
  imageData: ImageData;
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  saveImageData() {
    this.imageData = this.context.getImageData(0,0,this.context.canvas.clientWidth, this.context.canvas.clientHeight);
  }

  putImageData() {
    this.context.putImageData(this.imageData,0,0);
  }

}
