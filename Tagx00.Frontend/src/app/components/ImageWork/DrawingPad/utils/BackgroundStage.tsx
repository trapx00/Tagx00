import React, { CSSProperties } from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";


interface Props {
  imageUrl: string;
  onImageLoaded: (width: number, height: number) => void;
}

@observer
export class BackgroundStage extends React.Component<Props, {}> {

  @observable width: number;
  @observable height: number;

  @action onLoad = ({target}) => {
    this.width = target.width;
    this.height = target.height;
    this.props.onImageLoaded(target.width, target.height);
  };

  render() {
    const imgStyle: CSSProperties = {
      position: "absolute"
    };

    const stageStyle: CSSProperties = {
      position: "relative",
      width: this.width,
      height: this.height
    };
    return <div style={stageStyle}>
    <img src={this.props.imageUrl} onLoad={this.onLoad} style={imgStyle}/>
      {this.props.children}
    </div>
  }
}
