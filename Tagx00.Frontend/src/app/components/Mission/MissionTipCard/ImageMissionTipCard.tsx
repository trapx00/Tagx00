import React from 'react';
import { ImageMissionType } from "../../../models/mission/image/ImageMission";
import { MissionTipCard } from "./index";
import { MissionType } from "../../../models/mission/Mission";
import { DefinitionItem } from "../../DefinitionItem";
import { LocaleMessage } from "../../../internationalization/components";
import { Tag}  from 'antd';
import { TagConfMap } from "../../../models/mission/MissionAsset";

interface Props {
  title: string;
  imageMissionType: ImageMissionType;
  allowCustomTag: boolean;
  tagConfMap: TagConfMap;
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
        {Object.keys(props.tagConfMap).map(x => {
          return <Tag key={x} color={"blue"}>{x}({props.tagConfMap[x]})</Tag>
        })}
      </DefinitionItem>
    </MissionTipCard>
}
