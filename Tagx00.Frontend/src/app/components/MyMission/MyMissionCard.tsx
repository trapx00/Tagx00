import React from "react";
import { MissionRequesterQueryItem } from "../../models/mission/image/MissionRequesterQueryItem";
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

interface Props {
  item: MissionRequesterQueryItem;
}

const maxTextCount = 23;

function processDescription(text: string) {
  return text.length < maxTextCount
  ? text : text.substr(0, maxTextCount) + "...";
}

export class MyMissionCard extends React.Component<Props, any> {
  render() {

    const { item } = this.props;
    return <Card
      style={{ width: 300 }}
      cover={<img alt="example" src={item.coverUrl} />}
      actions={[
        <Icon type="setting" />,
        <Icon type="edit" />,
        <Icon type="ellipsis" />
      ]}>
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={item.title}
        description={processDescription(item.description)}
      />
    </Card>
  }
}
