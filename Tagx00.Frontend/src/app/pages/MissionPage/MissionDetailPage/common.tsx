import { default as React, ReactNode } from "react";
import { LocaleMessage } from "../../../internationalization/components";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { Icon, Tabs} from 'antd';
import { Gallery } from "../../../components/Gallery";
import { DEFAULT_COVER_URL } from "../../../components/Mission/util";
const {TabPane} = Tabs;


export const ID_PREFIX = "missions.missionDetail.";

export function Item(props: { promptTextId: string, children: ReactNode }) {
  return <DefinitionItem prompt={<LocaleMessage id={ID_PREFIX + props.promptTextId}/>}>
    {props.children}
  </DefinitionItem>
}

export function PicPanelTabs(props: {titleId: string, titleIcon: string, children: ReactNode, coverUrl: string}){
  return <Tabs defaultActiveKey={"1"}>
    <TabPane key={"1"} tab={<span><Icon type={"picture"} /><LocaleMessage id={ID_PREFIX+"cover"}/></span>}>
      <Gallery images={[props.coverUrl || DEFAULT_COVER_URL]}/>
    </TabPane>
    <TabPane key={"2"} tab={<span><Icon type={props.titleIcon} /><LocaleMessage id={props.titleId}/></span>}>
      {props.children}
    </TabPane>
  </Tabs>;
}
