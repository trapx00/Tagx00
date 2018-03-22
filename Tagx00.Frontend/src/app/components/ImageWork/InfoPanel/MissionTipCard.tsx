import React from "react";
import { InfoPanelProps } from "./index";
import { Card, Tag } from 'antd';

export class MissionTipCard extends React.Component<InfoPanelProps, any> {
  render() {
    return <Card title={"Mission Target"}>
      <p><strong>Type: </strong> {this.props.job.type}</p>
      <p>
        <strong>Tags: </strong>
        {this.props.mission.publicItem.allowedTags.map(x => {
        return <Tag key={x} color={"blue"}>{x}</Tag>
        })}
        </p>
    </Card>
  }
}
