import React, { ReactNode } from 'react';
import styled from "styled-components";

interface Props {
  children: ReactNode[];
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Controller = styled.div`
    flex: 1 0 auto;
    min-width: 100px;
    & > * {
    margin: 8px 8px 8px 8px; !important;
    }
`;


export function WorkPageLayout(props: Props) {

    return <Container>
      {props.children[0]}
      <Controller>
        {props.children[1]}
      </Controller>
    </Container>;

}
