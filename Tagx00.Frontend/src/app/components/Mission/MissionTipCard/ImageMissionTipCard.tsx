import React from 'react';
import { ImageMissionType } from "../../../models/mission/image/ImageMission";
import { MissionTipCard } from "./index";
import { MissionType } from "../../../models/mission/Mission";
import { DefinitionItem } from "../../DefinitionItem";
import { LocaleMessage } from "../../../internationalization/components";
import { Tag}  from 'antd';

interface Props {
  title: string;
  imageMissionType: ImageMissionType;
  allowCustomTag: boolean;
  tags: string[];
}

const ID_PREFIX = "drawingPad.common.missionTipCard.IMAGE.";

export function ImageMissionTipCard(props: Props) {
    return <MissionTipCard missionType={MissionType.IMAGE} title={props.title}>
      <DefinitionItem prompt={<LocaleMessage id={`${ID_PREFIX}type`}/>}>
        <LocaleMessage id={`${ID_PREFIX}types.${props.imageMissionType}.name`}/>
      </DefinitionItem>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "allowCustomTag.prompt"}/>}>
        <LocaleMessage id={`${ID_PREFIX}allowCustomTag.${props.allowCustomTag}`}/>
      </DefinitionItem>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "tags"}/>}>
        {props.tags.map(x => {
          return <Tag key={x} color={"blue"}>{x}</Tag>
        })}
      </DefinitionItem>
    </MissionTipCard>
}
