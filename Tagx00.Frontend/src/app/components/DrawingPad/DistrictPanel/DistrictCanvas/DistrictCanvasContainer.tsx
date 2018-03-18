import React from "react";
import { BackgroundStage } from "../../BackgroundStage";
import { District } from "../Districts";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { ExistingDistrictsLayer } from "../ExistingDistrictsLayer";
import { CanvasLayer } from "./CanvasLayer";
import { DistrictDrawingSession } from "./DistrictDrawingSession";
import { CanvasController } from "./CanvasController";

interface DistrictCanvasContainerProps {

  drawingMode: boolean;
  districts: District[];
  onDistrictComplete: (dis: District) => void;
  onDistrictClicked: (dis: District) => void;
  imgUrl: string;
}

@observer
export class DistrictCanvasContainer extends React.Component<DistrictCanvasContainerProps, any> {

  @observable width: number;
  @observable height: number;


  @action onBackgroundImageLoaded = (width, height) => {
    this.height = height;
    this.width = width;
  };

  onDistrictComplete = (district: District) => {
    console.log(district);
    this.props.onDistrictComplete(district);
  };

  render() {
    let session;
    if (this.props.drawingMode) {
      session = new DistrictDrawingSession();
    }
    return <div>
    <BackgroundStage imageUrl={this.props.imgUrl}
                       onImageLoaded={this.onBackgroundImageLoaded}>

        <ExistingDistrictsLayer districts={this.props.districts} width={this.width} height={this.height}/>
        {this.props.drawingMode
          ? <CanvasLayer
            session={session}
          width={this.width}
          height={this.height}
          />

          : null};
      </BackgroundStage>
      { this.props.drawingMode
        ? <CanvasController session={session} onDistrictComplete={this.onDistrictComplete}/>
        : null}
    </div>
  }
}
