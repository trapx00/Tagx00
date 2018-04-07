import React, { ReactNode } from 'react';
import * as localStyle from './style.css';

interface Props {
  children: ReactNode[];
  imageWidth: number;
  imageHeight: number;
  setScale: (scale: number) => void;
  imageUrl: string;
}

export class ImageWorkPageLayout extends React.Component<Props, {}> {

  pictureContainerRef = (React as any).createRef();
  pictureRef = (React as any).createRef();
  scale: number = 1;

  onResize = () => {
    this.adjustPictureSize();
  };

  adjustPictureSize = () => {
    const width = this.pictureContainerRef.current.clientWidth;
    const newScale = width / this.props.imageWidth;
    if (newScale != this.scale) {
      this.scale = newScale;
      this.appendScale();
      this.props.setScale(newScale);
    }
  };

  appendScale() {
    const width= this.scale * this.props.imageWidth;
    const height= this.scale * this.props.imageHeight;
    this.pictureRef.current.style.transform = `scale(${Math.min(this.scale, 1)})`;
    // this.pictureRef.current.style.width = `${width}px`;
    // this.pictureRef.current.style.height = `${height}px`;
    // this.pictureContainerRef.current.style.width = `${width}px`;
    this.pictureContainerRef.current.style.height = `${height}px`;
  }

  componentDidUpdate() {
    this.adjustPictureSize();
  }

  componentDidMount() {
    window.onresize = this.onResize;
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  render() {
    return <div className={localStyle.container}>
      <div ref={this.pictureContainerRef}
           style={{
             width: this.props.imageWidth,
             height: this.props.imageHeight
           }} className={localStyle.picture}>
        <div ref={this.pictureRef} style={{
          transform: "scale(1)",
          width: this.props.imageWidth,
          height: this.props.imageHeight,
          transformOrigin: "left top"
        }} >
        {this.props.children[0]}
        </div>
      </div>
      <div className={localStyle.controller}>
        {this.props.children[1]}
      </div>
    </div>
  }
}
