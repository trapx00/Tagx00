import { DistrictNotation } from "./Districts";
import React from "react"
import { DistrictDrawer } from "./DistrictCanvas/DistrictDrawer";
import { Point } from "../../../models/instance/image/Shapes";
import { observer } from "mobx-react";

interface ExistingDistrictsLayerProps {
  districts: DistrictNotation[];
  width: number;
  height: number;
  onDistrictSelected: (district: DistrictNotation) =>void;
}

@observer
export class ExistingDistrictsLayer extends React.Component<ExistingDistrictsLayerProps, any> {


  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  drawer: DistrictDrawer;

  ref = (ref) => {
    this.canvas = ref;
    this.canvasContext = this.canvas.getContext("2d");
    this.drawer = new DistrictDrawer(this.canvasContext);
  };

  componentDidMount() {
    this.renderAllDistricts();
  }

  componentDidUpdate() {
    this.renderAllDistricts();
  }

  renderAllDistricts = () => {
    this.canvasContext.clearRect(0, 0, this.props.width, this.props.height);
    this.props.districts.forEach(x => {
      x.draw(this.drawer);
    });
  };

  getCursorPosition(e): Point {
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: Math.trunc(e.clientX - left),
      y: Math.trunc(e.clientY - top)
    };
  }


  onMouseDown = (e) => {
    const point = this.getCursorPosition(e);
    const clickedDistrict = this.props.districts.find(x=> x.district.isInside(point));
    console.log(clickedDistrict);
    if (clickedDistrict) {
      this.props.onDistrictSelected(clickedDistrict);
    }
  };

  render() {
    return <canvas ref={this.ref}
                   style={{position: "absolute"}}
                   width={this.props.width}
                   height={this.props.height}
                   onMouseDown={this.onMouseDown}
    >

    </canvas>;
  }
}
