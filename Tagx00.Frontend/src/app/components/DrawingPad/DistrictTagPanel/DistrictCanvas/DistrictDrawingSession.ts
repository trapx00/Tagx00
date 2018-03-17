import { Boundary, District, DistrictUnit } from "../Shapes";
import { Point } from "../../PadProps";
import { DrawingSession } from "../../DrawingSession";
import { action, computed, observable } from "mobx";
import { start } from "repl";

export enum SessionStep {
  NotStarted,
  DrawingBoundary,
  SelectingArea,
  AreaSelected,

}

export class DistrictDrawingSession extends DrawingSession {
  @observable step = SessionStep.NotStarted;
  district: District = new District();
  unit: DistrictUnit = new DistrictUnit();
  boundary: Boundary = null;
  startPoint: Point;
  @observable error: string;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }

  @computed get canContinueDrawing() {
    return this.step === SessionStep.NotStarted
      || this.step === SessionStep.AreaSelected;
  }

  @action boundaryComplete(save: boolean) {
    if (save) {
      this.unit.boundaries.push(this.boundary);
    }
    console.log(this);
    if (this.unit.boundaries.length == 0) {
      this.step = SessionStep.NotStarted;
    } else {
      this.step = SessionStep.SelectingArea;
    }

  }

  @action startDrawingBoundary(startPoint: Point) {
    this.boundary = null;
    this.step = SessionStep.DrawingBoundary;
    this.startPoint = startPoint;
    this.boundary = new Boundary();
    this.boundary.push(startPoint);
  }

  @action startSelectingArea() {
    this.step = SessionStep.SelectingArea;
  }

  @action selectArea(innerPoint: Point) {
    this.unit.innerPoint = innerPoint;
    this.district.districts.push(this.unit);
    const unit = this.unit;
    this.unit = new DistrictUnit();
    this.step = SessionStep.AreaSelected;
    return unit;
  }

}