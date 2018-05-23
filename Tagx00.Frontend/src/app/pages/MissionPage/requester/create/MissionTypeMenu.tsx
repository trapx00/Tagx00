import React from "react";
import { Menu, Icon } from "antd";

interface Props {
  handleClick:(e)=>void,
  current: string
}
export class MissionTypeMenu extends React.Component<Props,{}> {
  render() {
    const props = this.props;
    return <Menu onClick={props.handleClick} selectedKeys={[props.current]} mode="horizontal">
        <Menu.Item key="image">
          <Icon type="picture"/>图片标注
        </Menu.Item>
        <Menu.Item key="text">
          <Icon type="file-text"/>文本标注
        </Menu.Item>
      </Menu>
  }
}