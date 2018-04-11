import React, { ReactNode } from 'react';
import styled from "styled-components";

interface Props {
  children: ReactNode[];
  imageWidth: number;
  imageHeight: number;
  setScale: (scale: number) => void;
  imageUrl: string;
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Controller = styled.div`
    flex: 1 0 auto;
    min-width: 100px;
`;

interface PictureContainerProps {
  width: number;
  height: number;
}
const PictureContainer = styled.div`
    overflow: hidden;
    margin-right: 8px;
    margin-bottom: 8px;
    width: ${(props: PictureContainerProps) => props.width};
    height: ${(props: PictureContainerProps) => props.height};
`;

interface PictureProps {
  width: number;
  height: number;
}

const Picture = styled.div`
  transform-origin: top left;
  transform: scale(1);
  width: ${(props: PictureProps) => props.width};
  height: ${(props: PictureProps) => props.height};
`;


export class ImageWorkPageLayout extends React.Component<Props, {}> {

  pictureContainerRef = React.createRef() as any;
  pictureRef = React.createRef() as any;
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
    const width = this.scale * this.props.imageWidth;
    const height = this.scale * this.props.imageHeight;
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


    return <Container>
      <PictureContainer innerRef={this.pictureContainerRef}
               width={this.props.imageWidth}
               height={this.props.imageHeight}>
        <Picture innerRef={this.pictureRef}
                 width={this.props.imageWidth}
                 height={this.props.imageHeight}>
          {this.props.children[0]}
        </Picture>
      </PictureContainer>
      <Controller>
        {this.props.children[1]}
      </Controller>
    </Container>
  }
}
