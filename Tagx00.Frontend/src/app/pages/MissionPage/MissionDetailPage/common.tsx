import { default as React, ReactNode } from "react";
import { LocaleMessage } from "../../../internationalization/components";
import { DefinitionItem } from "../../../components/DefinitionItem";


export const ID_PREFIX = "missions.missionDetail.";

export function Item(props: { promptTextId: string, children: ReactNode }) {
  return <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + props.promptTextId}/>}>
    {props.children}
  </DefinitionItem>
}
