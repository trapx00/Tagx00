import React from "react";
import { MissionRequesterQueryItem } from "../../models/mission/image/MissionRequesterQueryItem";
import { Col, Row, Layout, List } from 'antd';
import { MyMissionCard } from "./MyMissionCard";

interface Props {
  items: MissionRequesterQueryItem[];

}

export class MissionCardPane extends React.Component<Props, any> {
  render() {
    return <List
      grid={{ gutter: 16, xs: 1, sm: 2, xl: 3, xxl: 4 }}
      dataSource={this.props.items}
      renderItem={item => (
        <List.Item>
          <MyMissionCard item={item}/>
        </List.Item>
      )}
    />
  }
}
