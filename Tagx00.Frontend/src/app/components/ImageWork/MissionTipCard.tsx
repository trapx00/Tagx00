import React from "react";
import { Card, Tag } from 'antd';
import { ImageMissionType } from "../../models/mission/ImageMission";

interface Props {
  jobType: ImageMissionType;
  tags: string[];
  allowCustomTag: boolean;
}

export class MissionTipCard extends React.Component<Props, any> {
  render() {
    return <Card title={"Mission Target"}>
      <p><strong>Type: </strong> {this.props.jobType}</p>
      <div>
        <strong>Tags: </strong>
        {this.props.tags.map(x => {
          return <Tag key={x} color={"blue"}>{x}</Tag>
        })}
      </div>
      <p>
        This job does {this.props.allowCustomTag ? "not" : ""} support custom tag.
      </p>
    </Card>
  }
}
