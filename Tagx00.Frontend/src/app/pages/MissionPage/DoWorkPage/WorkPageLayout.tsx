import React, { ReactNode } from 'react';
import styled from "styled-components";

interface Props {
  children: ReactNode;
}


const WorkPanel = styled.div`
  width: 100%;

`;

const ControllerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & > * {
  flex-grow: 1;
  padding: 0 4px 0 4px;
  }
  
  @media (max-width: 1200px) {
    display: block;
  }
    margin: 8px 0 0 0;
`;

const OuterContainer = styled.div`
  
 
`;


const NavigatorContainer = styled.div`
  
`;

export function WorkPageLayout(props: Props) {
  return <OuterContainer>
    <WorkPanel>
      {props.children[0]}
    </WorkPanel>
    <ControllerContainer>
      {props.children[1]}
    </ControllerContainer>
    <NavigatorContainer>
      {props.children[2]}
    </NavigatorContainer>
  </OuterContainer>;
}

