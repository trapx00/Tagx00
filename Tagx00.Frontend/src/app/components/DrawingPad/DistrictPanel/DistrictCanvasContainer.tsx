import React from "react";
import { BackgroundStage } from "../utils/BackgroundStage";
import { District, DistrictNotation } from "./Districts";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { ExistingDistrictsLayer } from "./ExistingDistrictsLayer";
import { CanvasLayer } from "./DistrictCanvas/CanvasLayer";
import { DistrictDrawingSession } from "./DistrictCanvas/DistrictDrawingSession";
import { CanvasController } from "./DistrictCanvas/CanvasController";

interface DistrictCanvasContainerProps {

  drawingMode: boolean;
  districts: DistrictNotation[];
  onDistrictComplete: (dis: District) => void;
  onDistrictClicked: (dis: DistrictNotation) => void;
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

        <ExistingDistrictsLayer
          districts={this.props.districts}
          onDistrictSelected={this.props.onDistrictClicked}
          width={this.width}
          height={this.height}/>
        {this.props.drawingMode
          ? <CanvasLayer
            session={session}
            width={this.width}
            height={this.height}
          />

          : null}
      </BackgroundStage>
      {this.props.drawingMode
        ? <CanvasController
          session={session}
          onDistrictComplete={this.onDistrictComplete}/>
        : null}
    </div>
  }
}
