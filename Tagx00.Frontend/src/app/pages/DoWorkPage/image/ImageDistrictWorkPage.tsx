import React from "react";
import { ImageNotation } from "../../../stores/ImageWorkStore";
import { ImageWorkPageProps } from "./ImageWorkPage";
import { DistrictJob } from "../../../models/instance/image/job/DistrictJob";


export class ImageDistrictWorkPage extends React.Component<ImageWorkPageProps<DistrictJob>, any> {
  render() {

    return JSON.stringify(this.props.notation);
  }
}
