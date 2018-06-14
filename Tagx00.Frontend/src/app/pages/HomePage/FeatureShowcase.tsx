import React from 'react';
import styled from "styled-components";
import { LocaleMessage } from "../../internationalization/components";
import { ID_PREFIX } from "./index";
import { MissionType } from '../../models/mission/Mission';
import { Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';

const Container = styled.div`
  padding: 48px 8px 48px 8px;

`;

const Header = styled.h1`
  width: 100%;
  text-align: center;
`;

const ItemContainer = styled(QueueAnim)`
  display: flex;
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
  
   justify-content: center;
   flex-wrap: wrap;
   
   padding-top: 64px;
   padding-bottom: 64px;
   
  & > * {
    flex-grow: 1;
    justify-content: space-between;
    text-align: center;
    font-size: 28px;
    max-width: 300px;
  }
`;


/*
    "feature": {
      "responsiveness": "响应式设计，全设备适配",
      "shortcut": "快捷键，提高效率",
      "tagRecommendation": "机器学习驱动的标注推荐"
    }
 */

function FeatureItem(props: { icon: string, id: string }) {
  return <li>
    <div><Icon type={props.icon}/></div>
    <div><LocaleMessage id={ID_PREFIX + "feature." + props.id}/></div>
  </li>
}

export function FeatureShowcase(props: {}) {
  return <Container>
    <Header><LocaleMessage id={ID_PREFIX + "feature.title"}/></Header>
    <ItemContainer type="bottom" component="ul" key="ul" interval={0}>

      <FeatureItem key={"responsiveness"} id={"responsiveness"} icon={"appstore"}/>
      <FeatureItem key={"shortcut"} id={"shortcut"} icon={"smile"}/>
      <FeatureItem key={"tagRecommendation"} id={"tagRecommendation"} icon={"tags"}/>
      <FeatureItem key={"i18n"} id={"i18n"} icon={"global"}/>

    </ItemContainer>
  </Container>
}
