import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

interface Props {
  images: string[];
}


export class Gallery extends React.Component<Props, {}> {
  render () {
    return (
      <ImageGallery items={this.props.images.map(x => ({original: x, thumbnail: x}))}/>
    );
  }
}
