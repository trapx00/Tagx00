import React from 'react';
import { ImageMissionDetail } from "../../../models/mission/image/ImageMission";
import { Gallery } from "../../../components/Gallery";

interface Props {
  detail: ImageMissionDetail;
}

interface State {
}

export class ImageMissionDetailPage extends React.Component<Props, State> {

  render() {
    const {detail } = this.props;
    return <div>
      <h1>{detail.publicItem.title}</h1>
      <Gallery images={detail.imageUrls}/>
    </div>
  }
}
