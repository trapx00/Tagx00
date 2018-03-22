import { DistrictNotation } from "./Districts";
import React from "react";
import { runInAction } from "mobx";
import { TagDescriptionEditor } from "../utils/TagDescriptionEditor";
import { observer } from "mobx-react";

interface Props {
  district: DistrictNotation;
  onSelect: () => void;
}

@observer
export class DistrictItemComponent extends React.Component<Props, {}> {

  render() {
    const x = this.props.district;
    return <div>
      <p>
        <span>{x.district.id}</span>
        &emsp;
        <button onClick={this.props.onSelect}>
          {x.selected ? "Deselect" : "Select"}
        </button>
      </p>

    </div>
  }
}
