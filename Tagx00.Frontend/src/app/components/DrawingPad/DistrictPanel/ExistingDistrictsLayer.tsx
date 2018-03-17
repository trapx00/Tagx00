import { District } from "./Districts";
import * as React from "react";
import { DistrictDrawer } from "./DistrictCanvas/Drawer";
import { action } from "mobx";

interface ExistingDistrictsLayerProps {
  districts: District[];
  width: number;
  height: number;
}

export class ExistingDistrictsLayer extends React.Component<ExistingDistrictsLayerProps, any> {


  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;

  ref = (ref) => {
    this.canvas = ref;
    this.canvasContext = this.canvas.getContext("2d");

  };

  drawDistrict = (dis: District) => {

  };

  @action renderAllDistricts = () => {
    this.canvasContext.clearRect(0, 0, this.props.width, this.props.height);
    this.props.districts.forEach(this.drawDistrict);
  };

  render() {
    return <canvas ref={this.ref}
                   style={{position: "absolute"}}
                   width={this.props.width}
                   height={this.props.height}
    >

    </canvas>
  }
}
