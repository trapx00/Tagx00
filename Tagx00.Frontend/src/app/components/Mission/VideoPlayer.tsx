import React from 'react';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";
import Timer = NodeJS.Timer;
import styled from "styled-components";

interface Props {
  url: string;
  setRef?(s: VideoPlayer): void;
}

interface State {
  playing: boolean;
}

interface PlayRegionSession {
  endTime: number;
}

const PlayerContainer = styled.div`
margin-left: auto;
margin-right: auto;
max-width: 1000px;
  max-height: 1000px;
`;

export class VideoPlayer extends React.Component<Props, State> {

  state = {
    playing: false,
  };

  ref;

  replaySession: PlayRegionSession;

  get currentTime() {
    console.log(this.ref.getState());
    return this.ref.getState().player.currentTime;
  }


  playRegion(start: number, end: number) {
    this.replaySession = {
      endTime: end
    };

    this.ref.pause();
    this.ref.seek(start);
    this.ref.play();


  }

  playOrPause() {
    if (this.state.playing) {
      this.ref.pause();
    } else {
      this.ref.play();
    }
  }

  componentWillUnmount() {
    this.ref.pause();
  }

  onStateChange = (state, prevState) => {
    if (this.replaySession) {
      console.log(state);
      if (state.currentTime > this.replaySession.endTime) {
        this.ref.pause();
        this.replaySession = null;
        return;
      }
      if (state.paused) {
        this.replaySession = null;
      }
    }
  };

  refCallback = (ref) => {
    if (!ref) {
      return;
    }
    console.log(ref);
    this.ref = ref;
    this.props.setRef && this.props.setRef(this);

    ref.subscribeToStateChange(this.onStateChange)
  };

  render() {
    return<PlayerContainer>
    <Player src={this.props.url}
                  fluid={true}
              ref={this.refCallback}/>
    </PlayerContainer>;
  }

}
