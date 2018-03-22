import { action, observable } from "mobx";

export class Notation {
  @observable selected: boolean = false;
  @observable tag: string;
  @observable description: string;

  @action select() {
    this.selected = true;
  }

  @action deselect() {
    this.selected = false;
  }

  @action toggleSelect() {
    if (this.selected) {
      this.deselect();
    } else {
      this.select();
    }
  }
  
}
