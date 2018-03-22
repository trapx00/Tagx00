
import { DrawingSession } from "../../utils/DrawingSession";
import { action, computed, observable } from "mobx";
import { Boundary, District } from "../Districts";
import { Point } from "../../../../../models/instance/image/Shapes";

export enum Step {
  ReadyToDraw,
  DrawingBoundary,
  BoundaryDrawn,
  Complete

}

export class DistrictDrawingSession extends DrawingSession {
  @observable step = Step.ReadyToDraw;
  district: District = new District();
  boundary: Boundary = null;
  startPoint: Point;
  @observable error: string;

  width: number;
  height: number;

  init(context: CanvasRenderingContext2D) {
    this.context = context;
    this.width = context.canvas.clientWidth;
    this.height = context.canvas.clientHeight;
  }


  @computed get canContinueDrawing() {
    return this.step in [Step.ReadyToDraw, Step.BoundaryDrawn];
  }

  @action boundaryComplete(save: boolean) {
    if (save) {
      this.district.addBoundary(this.boundary);
    }
    if (this.district.added) {
      this.step = Step.BoundaryDrawn;
    } else {
      this.step = Step.ReadyToDraw;
    }

  }

  @action startDrawingBoundary(startPoint: Point) {
    this.boundary = null;
    this.step = Step.DrawingBoundary;
    this.startPoint = startPoint;
    this.boundary = new Boundary();
    this.boundary.push(startPoint);
  }

  @action continueDrawing() {
    this.step = Step.ReadyToDraw;
  }

}
