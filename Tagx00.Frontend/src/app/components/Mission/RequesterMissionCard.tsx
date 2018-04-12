import React from 'react';
import { MissionDetail } from "../../models/mission/Mission";
import { Card } from 'antd';
const { Meta} = Card;

interface Props {
  mission: MissionDetail;
}

export class RequesterMissionCard extends React.Component<Props, {}> {



  render() {
    const { publicItem} = this.props.mission;

    return <Card
      style={{width: 300}}
      cover={<img alt="example" src={publicItem.coverUrl}/>}
      actions={this.getActions(instance)}>
      <Meta
        title={this.title(publicItem.title)}
        description={processDescription(publicItem.description)}
      />
    </Card>

  }
}
