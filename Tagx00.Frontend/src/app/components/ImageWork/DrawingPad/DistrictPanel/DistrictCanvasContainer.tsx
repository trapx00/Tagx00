import React from "react";
import { BackgroundStage } from "../utils/BackgroundStage";
import { DistrictNotation } from "./Districts";
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
  onImageLoad: (width: number, height: number) => void;
  getScale: () => number;
}

@observer
export class DistrictCanvasContainer extends React.Component<DistrictCanvasContainerProps, any> {

  @observable width: number;
  @observable height: number;


  @action onBackgroundImageLoaded = (width, height) => {
    this.height = height;
    this.width = width;
    this.props.onImageLoad(width, height);
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
          height={this.height}
          getScale={this.props.getScale}
        />
        {this.props.drawingMode
          ? <CanvasLayer
            session={this.props.session}
            width={this.width}
            height={this.height}
            getScale={this.props.getScale}
          />
          : null}
      </BackgroundStage>

    </div>
  }
}
