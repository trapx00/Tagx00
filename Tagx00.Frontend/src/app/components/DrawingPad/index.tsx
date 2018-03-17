import React, { CSSProperties } from "react";
import { BackgroundImage } from "./BackgroundImage";
// import {RectangleTool} from "./Tools/Rectangle";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { DrawingPadStore } from "./DrawingPadStore";
import { Rectangle } from "./pads/RectPad/Rectangle";
import { FreePad } from "./pads/FreePad";
import { Point } from "./pads/PadProps";

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



  selectOnClick = (point: Point) => {

    const unit = this.store.units.find(x => x.rectangle.isOnSides(point));
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
        <FreePad districts={[]}
                 drawingMode={this.allowEditing}
                 onDrawComplete={()=>{}}
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
