import { MissionType } from "../../../models/mission/Mission";
import { MissionTipCard } from "./index";
import { DefinitionItem } from "../../DefinitionItem";
import { TextMissionSetting, TextMissionType } from "../../../models/mission/text/TextMissionProperties";
import { LocaleMessage } from "../../../internationalization/components";
import React from 'react';
import { Tag } from 'antd';

interface Props {
  title: string;
  setting: TextMissionSetting;
}

const ID_PREFIX = "drawingPad.common.missionTipCard.TEXT.";

export function TextMissionTipCard(props: Props) {


  const key = props.setting.textMissionType === TextMissionType.CLASSIFICATION
  ? "classes": "keywords";

  return <MissionTipCard missionType={MissionType.TEXT} title={props.title}>
    <DefinitionItem prompt={<LocaleMessage id={`${ID_PREFIX}type`}/>}>
      <LocaleMessage id={`${ID_PREFIX}types.${props.setting.textMissionType}.name`}/>
    </DefinitionItem>
    <DefinitionItem prompt={<LocaleMessage id={`${ID_PREFIX}types.${props.setting.textMissionType}.${key}`}/>}>
      {props.setting[key].map(x => <Tag key={x} color={"blue"}>{x}</Tag>)}
    </DefinitionItem>
  </MissionTipCard>
}
