import React, { ReactNode } from 'react';
import { LayoutShortcutProps, WorkPageLayout } from "../../WorkPageLayout";
import styled from "styled-components";
import Hotkeys from 'react-hot-keys';


interface Props extends LayoutShortcutProps{
  playOrPause(): void;

}


export class AudioWorkPageLayout extends React.Component<Props> {

  handleKeyDown = (keyName) => {
    if (keyName === "space") {
      this.props.playOrPause();
    }
  };

  render() {
    return <WorkPageLayout next={this.props.next}
                      previous={this.props.previous}
                      saveProgress={this.props.saveProgress}
                      moreHandler={this.handleKeyDown}
                      moreKey={["space"]}

      >
        {this.props.children[0]}
        {this.props.children[1]}
        {this.props.children[2]}
      </WorkPageLayout>
  }


}
