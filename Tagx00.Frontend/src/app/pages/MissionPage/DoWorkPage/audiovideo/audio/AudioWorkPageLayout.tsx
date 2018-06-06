import React, { ReactNode } from 'react';
import { WorkPageLayout } from "../../WorkPageLayout";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}


const AudioAndListContainer = styled.div`
  min-width: 500px;
  text-align:center;
`;

export function AudioWorkPageLayout(props: Props) {
  return <WorkPageLayout>
    <AudioAndListContainer>
      {props.children[0]}
    </AudioAndListContainer>
    {props.children[1]}
  </WorkPageLayout>;
}
