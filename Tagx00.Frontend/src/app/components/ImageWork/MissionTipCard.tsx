import React from "react";
import { Card, Tag } from 'antd';
import { ImageMissionType } from "../../models/mission/image/ImageMission";
import { LocaleMessage } from "../../internationalization/components";
import { DefinitionItem } from "../DefinitionItem";

interface Props {
  jobType: ImageMissionType;
  tags: string[];
  allowCustomTag: boolean;
  title: string;
}


const prefix = "drawingPad.common.missionTipCard.";

export class MissionTipCard extends React.Component<Props, {}> {
  render() {

    return <Card title={<LocaleMessage id={prefix+"title"}/>}>
      <DefinitionItem prompt={<LocaleMessage id={prefix+"missionTitle"}/>}>
        {this.props.title}
      </DefinitionItem>
      <DefinitionItem prompt={<LocaleMessage id={prefix+"type"}/>}>
        <LocaleMessage id={`${prefix}types.${this.props.jobType}`}/>
      </DefinitionItem>
      <DefinitionItem prompt={<LocaleMessage id={prefix+"allowCustomTag.prompt"}/>}>
      <LocaleMessage id={`${prefix}allowCustomTag.${this.props.allowCustomTag}`}/>
    </DefinitionItem>
      <DefinitionItem prompt={<LocaleMessage id={prefix+"tags"}/>}>
        {this.props.tags.map(x => {
          return <Tag key={x} color={"blue"}>{x}</Tag>
        })}
      </DefinitionItem>
    </Card>
  }
}
