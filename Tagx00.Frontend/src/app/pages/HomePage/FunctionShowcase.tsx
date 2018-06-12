import React from 'react';
import styled from "styled-components";
import { LocaleMessage } from "../../internationalization/components";
import { ID_PREFIX } from "./index";
import { MissionType } from '../../models/mission/Mission';
import { Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';

const Container = styled.div`

  padding: 48px 8px 48px 8px;
  background-color: #3C54E2;
  
  *  {
  color: white;
  }
  
`;

const Header = styled.h1`
  width: 100%;
  text-align: center;
`;

const ItemContainer = styled.div`
  display: flex;
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
  
   justify-content: center;
   flex-wrap: wrap;
   
   padding-top: 64px;
   padding-bottom: 64px;
   
  * {
    flex-grow: 1;
    justify-content: space-between;
    text-align: center;
    font-size: 28px;
    
  }
`;

function TagMissionItem(props: { icon: string, type: MissionType }) {
  return <div>
    <div><Icon type={props.icon}/></div>
    <div><LocaleMessage id={ID_PREFIX + "function." + props.type}/></div>
  </div>
}

export function FunctionShowcase(props: {}) {
  return <Container>
    <Header><LocaleMessage id={ID_PREFIX + "function.title"}/></Header>
    <ItemContainer>

      <TagMissionItem type={MissionType.IMAGE} icon={"picture"}/>
      <TagMissionItem type={MissionType.TEXT} icon={"file-text"}/>
      <TagMissionItem type={MissionType.AUDIO} icon={"sound"}/>
      <TagMissionItem type={MissionType.VIDEO} icon={"video-camera"}/>
      <TagMissionItem type={MissionType.THREE_DIMENSION} icon={"user"}/>
    </ItemContainer>
  </Container>
}
