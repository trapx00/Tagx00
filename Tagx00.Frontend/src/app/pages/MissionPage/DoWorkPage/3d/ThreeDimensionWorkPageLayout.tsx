import React, { ReactNode } from 'react';
import { LayoutShortcutProps, WorkPageLayout } from "../WorkPageLayout";
import styled from "styled-components";

interface Props extends LayoutShortcutProps {
  children: ReactNode;
}


export function ThreeDimensionWorkPageLayout(props: Props) {
  return <WorkPageLayout
    next={props.next}
    previous={props.previous}
    saveProgress={props.saveProgress}

  >
    {props.children[0]}
    {props.children[1]}
    {props.children[2]}
  </WorkPageLayout>;
}
