import React, { ReactNode } from 'react';
import { LayoutShortcutProps, WorkPageLayout } from "../../WorkPageLayout";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}


interface Props extends LayoutShortcutProps{
  playOrPause(): void;

}


export function VideoWorkPageLayout(props: Props) {

  const handleKey = (keyName) => {
    if (keyName === "space") {
      props.playOrPause();
    }
  };
    return <WorkPageLayout next={props.next}
                           previous={props.previous}
                           saveProgress={props.saveProgress}
                           moreHandler={handleKey}
                           moreKey={["space"]}

    >
      {props.children[0]}
      {props.children[1]}
      {props.children[2]}
    </WorkPageLayout>



}
