import React from 'react';
import { TagConfTuple } from "../../../models/mission/MissionAsset";
import { MissionTipCard } from "./index";
import { MissionType } from "../../../models/mission/Mission";
import { DefinitionItem } from "../../DefinitionItem";
import { LocaleMessage } from "../../../internationalization/components";
import { Tag } from 'antd';
import { ThreeDimensionMissionType } from "../../../models/mission/3d/3dMission";

interface Props {
  title: string;
  audioMissionType: ThreeDimensionMissionType;
  allowCustomTag: boolean;
  tagConfTuples: TagConfTuple[];
}

const ID_PREFIX = "drawingPad.common.missionTipCard.THREE_DIMENSION.";

export function ThreeDimensionMissionTipCard(props: Props){
  return <MissionTipCard missionType={MissionType.THREE_DIMENSION} title={props.title}>
    <DefinitionItem prompt={<LocaleMessage id={`${ID_PREFIX}type`}/>}>
      <LocaleMessage id={`${ID_PREFIX}types.${props.audioMissionType}.name`}/>
    </DefinitionItem>
    <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "allowCustomTag.prompt"}/>}>
      <LocaleMessage id={`${ID_PREFIX}allowCustomTag.${props.allowCustomTag}`}/>
    </DefinitionItem>
    <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "tags"}/>}>
      {props.tagConfTuples.map(x => {
        return <Tag key={x.tag} color={"blue"}>{x.tag}({x.confidence})</Tag>
      })}
    </DefinitionItem>
  </MissionTipCard>;
}
