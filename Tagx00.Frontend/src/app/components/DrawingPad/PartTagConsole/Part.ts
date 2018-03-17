import { action, observable } from "mobx";
import { Rectangle } from "./Rectangle";

export class Part {
  @observable rectangle: Rectangle;
  @observable selected: boolean = false;
  @observable modifying: boolean = false;
  @observable tag: string;
  @observable description: string;

  constructor(rectangle: Rectangle) {
    this.rectangle = rectangle;
  }

  @action select() {
    this.selected = true;
    this.rectangle.color = "#FF0000";
  }

  @action deselect() {
    this.selected = false;
    this.rectangle.color = "#000000";
  }

  @action toggleSelect() {
    if (this.selected) {
      this.deselect();
    } else {
      this.select();
    }
  }

  @action modify() {
    this.modifying = true;
  }

  @action completeModify() {
    this.modifying = false;
  }
}