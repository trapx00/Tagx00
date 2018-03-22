import * as React from "react";
import { Input, Tag, Icon, List, Avatar } from "antd";

const smallerDiv = {
  display: 'inline',
  margin: '2%'
};

interface ClickableTagProps {
  onClick: (e) => void;
  color: string;
  value: string;
}

export class ClickableTag extends React.Component<ClickableTagProps, any> {
  render() {
    return (
      <Tag color={this.props.color}>
        <div onClick={this.props.onClick} style={smallerDiv}>{this.props.value}</div>
      </Tag>
    )
  }
}
