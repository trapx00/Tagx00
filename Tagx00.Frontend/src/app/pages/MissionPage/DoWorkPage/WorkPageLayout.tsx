import React, { ReactNode } from 'react';
import styled from "styled-components";
import Hotkeys from 'react-hot-keys';

export interface LayoutShortcutProps {
  next(): void;

  previous(): void;

  saveProgress(): void;

  moreKey?: string[];

  moreHandler?(keyName: string): void;
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


export class WorkPageLayout extends React.Component<LayoutShortcutProps> {


  static defaultProps = {
    moreKey: []
  };

  keymap = {
    "a": this.props.previous,
    "d": this.props.next,
    "ctrl+s": this.props.saveProgress
  };

  onKeyDown = (keyName, e) => {
    e.preventDefault();
  };

  onKeyUp = (keyName, e) => {

    console.log(`${keyName} stroke`);
    const f = this.keymap[keyName];
    if (!f) {
      if (this.props.moreHandler) {

        this.props.moreHandler(keyName);
      }
    } else {
      f();
    }
  };


  render() {
    return <Hotkeys
      keyName={[...this.props.moreKey, ...Object.keys(this.keymap)].join(",")}
      onKeyDown={this.onKeyDown}
      onKeyUp={this.onKeyUp}
    >
      <OuterContainer>

        <WorkPanel>
          {this.props.children[0]}
        </WorkPanel>
        <ControllerContainer>
          {this.props.children[1]}
        </ControllerContainer>
        <NavigatorContainer>
          {this.props.children[2]}
        </NavigatorContainer>

      </OuterContainer>
    </Hotkeys>

  }
}

