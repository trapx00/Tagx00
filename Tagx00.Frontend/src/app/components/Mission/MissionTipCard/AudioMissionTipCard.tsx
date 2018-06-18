import React from 'react';
import { TagConfTuple } from "../../../models/mission/MissionAsset";
import { AudioMissionType } from "../../../models/mission/audio/AudioMission";
import { MissionTipCard } from "./index";
import { MissionType } from "../../../models/mission/Mission";
import { DefinitionItem } from "../../DefinitionItem";
import { LocaleMessage } from "../../../internationalization/components";
import { Tag } from 'antd';

interface Props {
  title: string;
  audioMissionType: AudioMissionType;
  allowCustomTag: boolean;
  tags: string[];
}

const ID_PREFIX = "drawingPad.common.missionTipCard.AUDIO.";

export function AudioMissionTipCard(props: Props){
  return <MissionTipCard missionType={MissionType.AUDIO} title={props.title}>
    <DefinitionItem prompt={<LocaleMessage id={`${ID_PREFIX}type`}/>}>
      <LocaleMessage id={`${ID_PREFIX}types.${props.audioMissionType}.name`}/>
    </DefinitionItem>
    <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "allowCustomTag.prompt"}/>}>
      <LocaleMessage id={`${ID_PREFIX}allowCustomTag.${props.allowCustomTag}`}/>
    </DefinitionItem>
    <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "tags"}/>}>
      {props.tags.map(x => {
        return <Tag key={x} color={"blue"}>{x}</Tag>
      })}
    </DefinitionItem>
  </MissionTipCard>;
}
