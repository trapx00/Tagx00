import React from "react";
import { Card, Tag } from 'antd';
import { ImageMissionType } from "../../models/mission/image/ImageMission";
import { LocaleMessage } from "../../internationalization/components";

interface Props {
  jobType: ImageMissionType;
  tags: string[];
  allowCustomTag: boolean;
  title: string;
}

export class MissionTipCard extends React.Component<Props, any> {
  render() {
    const prefix = "drawingPad.common.missionTipCard.";
    return <Card title={<LocaleMessage id={prefix+"title"}/>}>
      <p>
        <strong><LocaleMessage id={prefix+"missionTitle"}/></strong>:
        {this.props.title}
        </p>
      <p><strong><LocaleMessage id={prefix+"type"}/></strong>
        <LocaleMessage id={`${prefix}types.${this.props.jobType}`}/>
      </p>
      <div>
        <strong>{
        this.props.allowCustomTag
          ? <LocaleMessage id={prefix+"recommendedTags"}/>
          : <LocaleMessage id={prefix+"allowedTags"}/>
        }</strong>
        {this.props.tags.map(x => {
          return <Tag key={x} color={"blue"}>{x}</Tag>
        })}
      </div>
    </Card>
  }
}
