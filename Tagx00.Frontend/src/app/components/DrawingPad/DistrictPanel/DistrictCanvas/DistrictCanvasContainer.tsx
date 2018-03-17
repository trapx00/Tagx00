import React from "react";
import { BackgroundStage } from "../../BackgroundStage";
import { District } from "../Districts";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { ExistingDistrictsLayer } from "../ExistingDistrictsLayer";
import { CanvasLayer } from "./CanvasLayer";

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

  render() {
    return <BackgroundStage imageUrl={this.props.imgUrl}
                       onImageLoaded={this.onBackgroundImageLoaded}>

        <ExistingDistrictsLayer districts={this.props.districts} width={this.width} height={this.height}/>
        {this.props.drawingMode
          ? <CanvasLayer
          width={this.width}
          height={this.height}
          onDistrictComplete={console.log.bind(console)}
          />

          : null};
      </BackgroundStage>;
  }
}
