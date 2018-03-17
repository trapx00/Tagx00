import { Point } from "../../ImageLib/Shapes";
import { DrawingSession } from "../../DrawingSession";
import { action, computed, observable } from "mobx";
import { start } from "repl";
import { Boundary, District, DistrictUnit } from "../Districts";

export enum Step {
  ReadyToDraw,
  DrawingBoundary,
  BoundaryDrawn,
  SelectingArea,
  AreaSelected,

}

export class DistrictDrawingSession extends DrawingSession {
  @observable step = Step.ReadyToDraw;
  district: District = new District();
  unit: DistrictUnit;
  boundary: Boundary = null;
  startPoint: Point;
  @observable error: string;

  width: number;
  height: number;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.width = context.canvas.clientWidth;
    this.height = context.canvas.clientHeight;
    this.unit = new DistrictUnit(this.width, this.height);

    const around = new Boundary();
    around.push({x: 0, y: 0});
    around.push({x: this.width-1,y:0});
    around.push({x: this.width-1, y: this.height-1});
    around.push({x: 0, y: this.height-1});
    around.push({x: 0, y: 0});

    this.boundary  = around;
    this.boundaryComplete(true);

  }

  @computed get canContinueDrawing() {
    return this.step === Step.ReadyToDraw;
  }

  @action boundaryComplete(save: boolean) {
    if (save) {
      this.unit.addBoundary(this.boundary);
    }
    if (this.unit.added) {
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

  @action startSelectingArea() {
    this.step = Step.SelectingArea;
  }

  @action selectArea(innerPoint: Point) {
    this.unit.innerPoint = innerPoint;
    this.district.districts.push(this.unit);
    const unit = this.unit;
    this.unit = new DistrictUnit(this.width, this.height);
    this.step = Step.AreaSelected;
    return unit;
  }

}
