import React, { ReactNode } from 'react';
import { WorkPageLayout } from "../WorkPageLayout";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}


export function ThreeDimensionWorkPageLayout(props: Props) {
  return <WorkPageLayout>
    {props.children[0]}
    {props.children[1]}
    {props.children[2]}
  </WorkPageLayout>;
}
