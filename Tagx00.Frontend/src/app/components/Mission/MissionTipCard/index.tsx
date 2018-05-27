import React, { ReactNode } from "react";
import { Card, Tag } from 'antd';
import { LocaleMessage } from "../../../internationalization/components";
import { DefinitionItem } from "../../DefinitionItem";
import { MissionType } from "../../../models/mission/Mission";

export interface MissionTipCardProps {
  missionType: MissionType;
  title: string;
  children?: ReactNode;
}


const ID_PREFIX = "drawingPad.common.missionTipCard.";

export function MissionTipCard(props: MissionTipCardProps){
  
    return <Card title={<LocaleMessage id={ID_PREFIX + "title"}/>}>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "missionTitle"}/>}>
        {props.title}
      </DefinitionItem>
      <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + "missionType"}/>}>
        <LocaleMessage id={`${ID_PREFIX}${props.missionType}.name`}/>
      </DefinitionItem>
      {props.children}
    </Card>
}
