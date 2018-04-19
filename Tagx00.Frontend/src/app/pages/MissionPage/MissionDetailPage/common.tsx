import styled from "styled-components";
import { default as React, ReactNode } from "react";
import { LocaleMessage } from "../../../internationalization/components";

export const Prompt = styled.span`
    float: left;
    width: 100px;
    color: darkgray;
   
`;

export const Content = styled.span`

`;

export const Container = styled.p`
    margin-bottom: 1em;
`;

export const ID_PREFIX = "missions.missionDetail.";

export function Item(props: { promptTextId: string, children: ReactNode }) {
  return <Container>
    <Prompt><LocaleMessage id={ID_PREFIX + props.promptTextId}/></Prompt>
    {/*<Icon type={props.icon} style={{marginRight: "4px"}}/>*/}
    <Content>{props.children}</Content>
  </Container>
}
