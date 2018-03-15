import React, {CSSProperties} from "react";
import {BackgroundImage} from "./BackgroundImage";
import {Layer} from "./Layer";
import {RectangleTool} from "./Tools/Rectangle";
import {observer} from "mobx-react";
import {action, observable} from "mobx";

interface LayeredCanvasProps {
  imageUrl: string;

}

@observer
export class LayeredCanvas extends React.Component<LayeredCanvasProps, {}> {

  @observable layers: JSX.Element[] = [];
  @observable height: number = 200;
  @observable width: number = 200;

  @action pushInLayer(layer) {
    this.layers = this.layers.concat([layer]);
  }

  @action backgroundImageLoaded = (width, height) => {
    this.height = height;
    this.width = width;
    this.pushInLayer(
      <Layer zIndex={this.layers.length+1} key={1} width={this.width} height={this.height}
             getTool={(context) => new RectangleTool(context)}/>
    );
  };

  render() {
    const stageStyle: CSSProperties = {
      height: `${this.height}px`,
      width: `${this.width}px`,
      position: "relative"
    };
    return <div>
    <div style={stageStyle}>

      <BackgroundImage initialHeight={this.height}
                       initialWidth={this.width}
                       imageUrl={this.props.imageUrl}
                       onLoad={this.backgroundImageLoaded}/>
      {this.layers}
    </div>
    </div>;
  }
}
