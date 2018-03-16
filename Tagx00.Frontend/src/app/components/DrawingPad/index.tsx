import React, { CSSProperties } from "react";
import { BackgroundImage } from "./BackgroundImage";
// import {RectangleTool} from "./Tools/Rectangle";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { DrawingPadStore } from "./DrawingPadStore";
import { RectPad } from "./RectPad";
import { Point, Rectangle } from "./RectPad/Rectangle";

interface DrawingPadProps {
  imageUrl: string;

}

@observer
export class DrawingPad extends React.Component<DrawingPadProps, {}> {

  store: DrawingPadStore = new DrawingPadStore();

  @observable height: number = 200;
  @observable width: number = 200;
  @observable allowEditing: boolean = false;

  @action onNewLayerClicked = (e) => {
    this.allowEditing = true;
  };

  @action backgroundImageLoaded = (width, height) => {
    this.height = height;
    this.width = width;
  };

  @action toggleAllowEditing = () => {
    this.allowEditing = !this.allowEditing;
  };


  @action drawComplete = (rec: Rectangle) => {
    this.allowEditing = false;
    this.store.pushInRectangle(rec);
  };

  judgeIfOnSide(point: Point, rec: Rectangle) {
    const error = 5;
    const leftUpper = {
      x: rec.x, y: rec.y
    };
    const rightUpper = {
      x: rec.x + rec.width, y: rec.y
    };
    const leftDown = {
      x: rec.x, y: rec.y + rec.height
    };

    const rightDown = {
      x: rec.x+rec.width, y: rec.y + rec.height
    };

    return (Math.abs(point.y - leftUpper.y) <= error && point.x - leftUpper.x <= rec.width)
    || (Math.abs(point.y - leftDown.y) <= error && point.x - leftDown.x <= rec.width )
    || (Math.abs(point.x - leftUpper.x) <= error && point.y - leftUpper.y <= rec.height)
    || (Math.abs(point.x  - rightDown.x) <= error && point.y - rightUpper.y <= rec.height);

  }

  selectOnClick = (point: Point) => {

    const unit = this.store.units.find(x => this.judgeIfOnSide(point, x.rectangle));
    if (unit) {
      if (unit.selected) {
        unit.unselect();
      } else {
        unit.select();
      }
    }
  };

  render() {
    const stageStyle: CSSProperties = {
      position: "relative",
      width: this.width,
      height: this.height
    };
    return <div>
      <div>
        <button onClick={this.onNewLayerClicked}>Click to add a layer</button>
      </div>
      <div style={stageStyle}>

        <BackgroundImage initialHeight={this.height}
                         initialWidth={this.width}
                         imageUrl={this.props.imageUrl}
                         onLoad={this.backgroundImageLoaded}/>
        <RectPad rectangles={this.store.rectangles}
                 allowDrawing={this.allowEditing}
                 onDrawComplete={this.drawComplete}
                 width={this.width}
                 height={this.height}
                 onMouseClicked={this.selectOnClick}

        />
      </div>
      <div>
        Existing units:
        {this.store.units.map(x => <p key={x.id}>
          <br/>
          <a>
            {x.id}
          </a>
          &emsp;
          <a onClick={() => this.store.removeRectangle(x.id)}>
            Remove
          </a>
          &emsp;
          {
            x.selected
            ? <a onClick={() => this.store.unselectUnit(x.id)}>
                Unselect</a>
              : <a onClick={() => this.store.selectUnit(x.id)}>
                Select</a>
          }

        </p>)}
      </div>
    </div>;
  }
}
