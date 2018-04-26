import React from "react";
import { Boundary, District, DistrictNotation } from "./Districts";
import { DistrictCanvasContainer } from "./DistrictCanvasContainer";
import { Boundary as BI, DistrictTagDescriptionTuple } from "../../../../models/instance/image/job/DistrictJob";
import { DistrictDrawingSession } from "./DistrictCanvas/DistrictDrawingSession";

interface DistrictTagPanelProps {
  imageUrl: string;
  tuples: DistrictTagDescriptionTuple[];
  addingMode: boolean;
  session: DistrictDrawingSession;
  onTupleSelected: (tuple: DistrictTagDescriptionTuple) => void;
  selectedTuple: DistrictTagDescriptionTuple;
  onImageLoad: (width: number, height: number) => void;
  getScale: () => number;
}

function boundaryInterfaceToBoundaryClass(boundary: BI): Boundary {
  const obj = new Boundary();
  obj.points = boundary.points;
  return obj;
}

function boundariesTheSame(b1: BI[], b2: Boundary[]) {
  if (b1.length != b2.length) {
    return false;
  }

  for (let i =0;i<b1.length;i++) {
    if (b1[i].points !== b2[i].points ) {
      return false;
    }
  }
  return true;
}


export class DistrictPanel extends React.Component<DistrictTagPanelProps, {}> {

  onDistrictClicked = (district: DistrictNotation) => {
    const selectedTuple = this.props.tuples.find(x => boundariesTheSame(x.boundaries, district.district.boundaries));
    if (selectedTuple) {
      this.props.onTupleSelected(selectedTuple);
    }
  };


  render() {
    const notations = this.props.tuples.map(x =>
      new DistrictNotation(
        new District(
          x.boundaries.map(
            boundaryInterfaceToBoundaryClass))));

    const selectedNotation = this.props.selectedTuple ?
      notations.find(x => boundariesTheSame(this.props.selectedTuple.boundaries, x.district.boundaries))
      : null;

    return <div>
      <DistrictCanvasContainer
        selectedNotation={selectedNotation}
        drawingMode={this.props.addingMode}
        onDistrictClicked={this.onDistrictClicked}
        districts={notations}
        imgUrl={this.props.imageUrl}
        session={this.props.session}
        onImageLoad={this.props.onImageLoad}
        getScale={this.props.getScale}
      />
    </div>;
  }
}
