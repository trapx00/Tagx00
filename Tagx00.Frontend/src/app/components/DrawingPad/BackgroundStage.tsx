import React, { CSSProperties } from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";


interface BackgroundStageProps {
  imageUrl: string;
  onImageLoaded: (width: number, height: number) => void;
  width: number;
  height: number;
}

export class BackgroundStage extends React.Component<BackgroundStageProps, {}> {
  @action onLoad = ({target}) => {
    this.props.onImageLoaded(target.width, target.height);
  };

  render() {
    const imgStyle: CSSProperties = {
      position: "absolute"
    };

    const stageStyle: CSSProperties = {
      position: "relative",
      width: this.props.width,
      height: this.props.height
    };
    return <div style={stageStyle}>
      <img src={this.props.imageUrl} onLoad={this.onLoad} style={imgStyle}/>
      {this.props.children}
    </div>
  }
}
