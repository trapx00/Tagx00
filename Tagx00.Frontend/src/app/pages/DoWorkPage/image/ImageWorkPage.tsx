import React from "react";
import { ImageMissionDetail } from "../../models/mission/ImageMission";
import { ImageInstanceDetail } from "../../models/instance/image/ImageInstanceDetail";

interface Props {
  detail: ImageInstanceDetail;
}

export class ImageWorkPage extends React.Component<Props, any> {
  render() {
    return JSON.stringify(this.props.detail);
  }
}
