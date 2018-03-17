import * as React from "react";
import { action, computed, observable } from "mobx";
import { Rectangle } from "./pads/RectPad/Rectangle";
// import { Rectangle, RectangleTool } from "./Tools/Rectangle";

interface Tag {
  tag: string;
  descriptions: string[];
}

interface TagDescriptionTuple {
  tags: Tag[];
  descriptions: string[];
}



export class TagUnit {
  id: number;
  @observable rectangle: Rectangle;
  tuple: TagDescriptionTuple;

  @observable selected: boolean = false;

  constructor(rectangle: Rectangle) {
    this.id = Math.random();
    this.rectangle = rectangle;
    this.tuple = {
      tags: [],
      descriptions: []
    };
  }

  @action select() {
    this.selected = true;
    this.rectangle.color = "#FF0000";
  }

  @action unselect() {
    this.selected = false;
    this.rectangle.color = "#000000";
  }

}

export class DrawingPadStore {
  @observable units: TagUnit[]  = [];

  @computed get newId() {
    return this.units.length +1;
  }

  @computed get rectangles() {
    return this.units.map(x => x.rectangle);
  }

  // produceLayer(index: number): TagLayer {
  //   return new TagLayer(index)
  // }
  //
  getUnit(index: number) {
    return this.units.find(x => x.id === index);
  }

  selectUnit = (index: number) => {
    const layer = this.getUnit(index);
    if (layer) {
      console.log(`${layer.id} selected`);
      layer.select();
    }
  };

  unselectUnit = (index: number) => {
    const layer = this.getUnit(index);
    if (layer) {
      console.log(`${layer.id} unselected`);
      layer.unselect();
    }
  };

  @action pushInRectangle(rec: Rectangle) {
    this.units.push(new TagUnit(rec));
  };

  @action removeRectangle(recId: number) {
    this.units = this.units.filter(x => x.id !== recId);
  }

  //
  // @action requireLayer(layerProducer: (Layer: TagLayer) => JSX.Element) {
  //   const layer = this.produceLayer(this.newId);
  //   this.layers = this.layers.concat([layer]);
  //
  //   //idle the current listener
  //
  //   const listener = this.layers.find(x => x.state === LayerState.ListeningSelection);
  //   if (listener) {
  //     console.log(`${listener.id} is covered by new canvas and now goes to idle`);
  //     listener.changeState(LayerState.Idle);
  //   }
  //
  //   return layerProducer(layer);
  // }

}
