import React from 'react';
import { ImageMissionDetail } from "../../../models/mission/image/ImageMission";
import { Carousel as AntdCarousel} from 'antd';
import styled from "styled-components";
import Lightbox from 'react-images';
import produce from 'immer';
import { Gallery } from "../../../components/Gallery";

interface Props {
  detail: ImageMissionDetail;
}

interface State {
}

export class ImageMissionDetailPage extends React.Component<Props, State> {


  closeLightbox = () => {
    this.setState({...this.state, lightbox: {show: true}});
  };

  render() {
    const {detail } = this.props;
    return <div>
      <h1>{detail.publicItem.title}</h1>
      <Gallery images={detail.imageUrls}/>
    </div>
  }
}
