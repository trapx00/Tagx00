import { DistrictNotation } from "./Districts";
import React from "react"
import { DistrictDrawer } from "./DistrictCanvas/DistrictDrawer";
import { observer } from "mobx-react";
import { disableTouchScroll, getCursorPosition } from "../utils/getCursorPosition";

interface ExistingDistrictsLayerProps {
  districts: DistrictNotation[];
  selectedDistrict: DistrictNotation;
  width: number;
  height: number;
  onDistrictSelected: (district: DistrictNotation) =>void;
  getScale: () => number;
}

@observer
export class ExistingDistrictsLayer extends React.Component<ExistingDistrictsLayerProps, any> {


  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  drawer: DistrictDrawer;

  ref = (ref) => {
    this.canvas = ref;
    if (ref) {
      this.canvasContext = this.canvas.getContext("2d");
      this.drawer = new DistrictDrawer(this.canvasContext);
    }

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
      if (x === this.props.selectedDistrict) {
        this.drawer.fillDistrict(x.district,"rgba(255,0,0,0.4)");
      } else {
        this.drawer.strokeDistrict(x.district, "rgba(255,0,0,1)");
      }
    });
  };



  onMouseDown = (e) => {
    const point = getCursorPosition(this.canvas,e, this.props.getScale());
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
                   onTouchMove={disableTouchScroll}
                   onTouchStart={this.onMouseDown}
    >

    </canvas>;
  }
}
