import React, { ReactNode } from 'react';
import styled from "styled-components";
import { AvatarContainer } from "./AvatarContainer";

interface Props {
  avatarUrl: string;
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
`;

export function UserProfileLayout(props: Props) {
  return <Container>
    <AvatarContainer avatarUrl={props.avatarUrl}/>
    {props.children}
  </Container>
}
