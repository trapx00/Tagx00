import { action, computed, observable } from "mobx";
import { Rectangle } from "./Rectangle";
import { Notation } from "../utils/Notation";

export class RectangleNotation extends Notation {
  @observable rectangle: Rectangle;

  constructor(rectangle: Rectangle) {
    super();
    this.rectangle = rectangle;
  }

  @computed get color() {
    if (this.selected) {
      return "#FF0000";
    } else {
      return "#000000";
    }
  }
}
