import React from 'react';
import { TagConfTuple } from "../../../models/mission/MissionAsset";
import { VideoMissionType } from "../../../models/mission/video/VideoMission";
import { MissionTipCard } from "./index";
import { MissionType } from "../../../models/mission/Mission";
import { DefinitionItem } from "../../DefinitionItem";
import { LocaleMessage } from "../../../internationalization/components";
import { Tag } from 'antd';

interface Props {
  title: string;
  videoMissionType: VideoMissionType;
  allowCustomTag: boolean;
  tagConfTuples: TagConfTuple[];
}

const ID_PREFIX = "drawingPad.common.missionTipCard.VIDEO.";

export function VideoMissionTipCard(props: Props){
  return <MissionTipCard missionType={MissionType.VIDEO} title={props.title}>
    <DefinitionItem prompt={<LocaleMessage id={`${ID_PREFIX}type`}/>}>
      <LocaleMessage id={`${ID_PREFIX}types.${props.videoMissionType}.name`}/>
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
