import * as React from "react";
import { ReactNode } from "react";
import { Tag } from "antd";
import { TagProps } from "antd/lib/tag";

const smallerDiv = {
  display: 'inline',
  margin: '2%'
};

interface ClickableTagProps extends TagProps {
  onClick?: (e) => void;
  value?: ReactNode;
}

export class ClickableTag extends React.Component<ClickableTagProps, any> {
  onClick = (e) => {
    this.props.onClick && this.props.onClick(e);
  };

  render() {
    return (
      <Tag {...this.props}>
        <div onClick={this.onClick} style={smallerDiv}>
          {this.props.value}
          {this.props.children}
        </div>
      </Tag>
    )
  }
}
