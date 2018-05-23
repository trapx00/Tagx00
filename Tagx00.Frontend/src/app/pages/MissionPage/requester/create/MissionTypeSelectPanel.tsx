import React from "react";
import { Menu, Checkbox, Icon } from "antd";
import { ImageMissionCreateInfo } from "./image/ImageMissionCreateInfo";
import { TextMissionSpecialInfo } from "./TextMissionSpecialInfo";
import { ImageMissionSpecialInfo } from "./ImageMissionSpecialInfo";
import { MissionTypeMenu } from "./MissionTypeMenu";


interface Props {
  info:ImageMissionCreateInfo,
  locale:any,
  onAllowCustomTagChanged:(e)=>void,
  onTagsChange:(e)=>void,
  onTypeChange:(e)=>void,
  onFileListChange:(e)=>void,
}

export class MissionTypeSelectPanel extends React.Component<Props,{}> {
  state = {
    current: 'image',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    const props = this.props;
    switch(this.state.current) {
      case "image":
        return <div>
              <MissionTypeMenu handleClick={this.handleClick} current={this.state.current}/>
              <ImageMissionSpecialInfo info={props.info} locale={props.locale} onAllowCustomTagChanged={props.onAllowCustomTagChanged} onTagsChange={props.onTagsChange} onTypeChange={props.onTypeChange} onFileListChange={props.onFileListChange}/>
        </div>
      case "text":
        return <div>
          <MissionTypeMenu handleClick={this.handleClick} current={this.state.current}/>
          <TextMissionSpecialInfo/>
        </div>
      default:
        return null;

    }
  }

}
