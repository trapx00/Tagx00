import React from "react";
import { ImageNotation, ImageWorkStoreProps, STORE_IMAGEWORK } from "../../../stores/ImageWorkStore";
import { PartJob } from "../../../models/instance/image/job/PartJob";
import { inject, observer } from "mobx-react";
import { ImageWorkPageProps } from "./ImageWorkPage";


export class ImagePartWorkPage extends React.Component<ImageWorkPageProps<PartJob>, any> {
  render() {

    return JSON.stringify(this.props.notation);
  }
}
