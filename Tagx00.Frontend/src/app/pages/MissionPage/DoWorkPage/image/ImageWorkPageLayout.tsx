import React, { ReactNode } from 'react';
import styled from "styled-components";
import { LayoutShortcutProps, WorkPageLayout } from "../WorkPageLayout";

const MAX_WIDTH = 1000;

interface Props extends LayoutShortcutProps {
  children: ReactNode[];
  imageWidth: number;
  imageHeight: number;
  setScale: (scale: number) => void;
  imageUrl: string;
}

interface PictureContainerProps {
  width: number;
  height: number;
}

const PictureContainer = styled.div`
    overflow: hidden;
    //margin-left: auto;
    //margin-right: 4px
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
      margin-left: auto;
    margin-right: auto;
`;


export class ImageWorkPageLayout extends React.Component<Props, {}> {

  pictureContainerRef = React.createRef<HTMLDivElement>();
  pictureRef = React.createRef<HTMLDivElement>();
  scale: number = 1;

  onResize = () => {
    this.adjustPictureSize();
  };

  adjustPictureSize = () => {
    const width = this.pictureContainerRef.current.clientWidth;
    let newScale = width / this.props.imageWidth;
    if (newScale != this.scale) {


      const imageWidth = newScale * this.props.imageWidth;
      if (imageWidth > MAX_WIDTH){
        newScale = MAX_WIDTH / this.props.imageWidth;
      }

      console.log(newScale);

      this.scale = newScale;
      const height = this.scale * this.props.imageHeight;
      this.pictureRef.current.style.transform = `scale(${this.scale})`;
      this.pictureRef.current.style.width = `${imageWidth}px`;
      this.pictureRef.current.style.height = `${height}px`;
      // this.pictureContainerRef.current.style.width = `${imageWidth}px`;
      this.pictureContainerRef.current.style.height = `${height}px`;

      this.props.setScale(newScale);
    }
  };

  componentDidUpdate() {
    this.adjustPictureSize();
  }

  componentDidMount() {
    window.onresize = this.onResize;
  }

  componentWillUnmount() {
    window.onresize = undefined;
  }

  render() {


    return <WorkPageLayout
      previous={this.props.previous}
      next={this.props.next}
      saveProgress={this.props.saveProgress}
      moreKey={this.props.moreKey}
      moreHandler={this.props.moreHandler}
    >
      <PictureContainer innerRef={this.pictureContainerRef}
                        width={this.props.imageWidth}
                        height={this.props.imageHeight}>
        <Picture innerRef={this.pictureRef}
                 width={this.props.imageWidth}
                 height={this.props.imageHeight}>
          {this.props.children[0]}
        </Picture>
      </PictureContainer>
      {this.props.children[1]}
      {this.props.children[2]}
    </WorkPageLayout>
  }
}
