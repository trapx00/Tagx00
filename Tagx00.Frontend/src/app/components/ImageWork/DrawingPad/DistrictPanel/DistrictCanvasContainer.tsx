import React from "react";
import { BackgroundStage } from "../utils/BackgroundStage";
import { District, DistrictNotation } from "./Districts";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { ExistingDistrictsLayer } from "./ExistingDistrictsLayer";
import { CanvasLayer } from "./DistrictCanvas/CanvasLayer";
import { DistrictDrawingSession } from "./DistrictCanvas/DistrictDrawingSession";

interface DistrictCanvasContainerProps {

  drawingMode: boolean;
  session: DistrictDrawingSession;
  districts: DistrictNotation[];
  onDistrictClicked: (dis: DistrictNotation) => void;
  imgUrl: string;
  selectedNotation: DistrictNotation;
}

@observer
export class DistrictCanvasContainer extends React.Component<DistrictCanvasContainerProps, any> {

  @observable width: number;
  @observable height: number;


  @action onBackgroundImageLoaded = (width, height) => {
    this.height = height;
    this.width = width;
  };

  render() {
    return <div>
      <BackgroundStage imageUrl={this.props.imgUrl}
                       onImageLoaded={this.onBackgroundImageLoaded}>

        <ExistingDistrictsLayer
          selectedDistrict={this.props.selectedNotation}
          districts={this.props.districts}
          onDistrictSelected={this.props.onDistrictClicked}
          width={this.width}
          height={this.height}/>
        {this.props.drawingMode
          ? <CanvasLayer
            session={this.props.session}
            width={this.width}
            height={this.height}
          />
          : null}
      </BackgroundStage>

    </div>
  }
}
