import React from 'react';
import { Button } from 'antd';
import WaveSurfer from 'wavesurfer.js';


interface Props {
  url: string;

  onPlay?(): void;

  onPause?(): void;

  setRef?(player: AudioPlayer): void;
}

interface State {
  loadProgress: number;
}

export class AudioPlayer extends React.Component<Props, State> {

  state = {
    loadProgress: 0
  };

  // audioRef: HTMLAudioElement;
  waveContainerRef = React.createRef<HTMLDivElement>();
  waveSurfer;

  // onTimeUpdate = (e) => {
  //   const time = e.originalArgs[0];
  //   this.props.onTimeChanged && this.props.onTimeChanged(time);
  //   this.setState({
  //     pos: time
  //   });
  // };

  onPlay = () => {
    this.props.onPlay && this.props.onPlay();
  };

  onPause = () => {
    this.props.onPause && this.props.onPause();
  };

  componentDidMount() {
    this.waveSurfer = WaveSurfer.create({
      container: this.waveContainerRef.current,
      waveColor: 'blue',
      progressColor: 'purple',
      responsive: true,

    });
    this.waveSurfer.load(this.props.url);

    // attach callbacks
    this.waveSurfer.on('pause', this.onPause);
    this.waveSurfer.on('play', this.onPlay);
    this.waveSurfer.on('loading', (progress)=>this.setState({loadProgress: progress}));

    this.props.setRef && this.props.setRef(this);
  }

  componentWillUnmount() {
    this.waveSurfer.unAll();
  }

  get currentTime() {
    return this.waveSurfer.getCurrentTime();
  }

  pause = () => {
    this.waveSurfer.pause();
  }

  play = () => {
    this.waveSurfer.play();
  }

  playRegion(start: number, end: number) {
    this.waveSurfer.play(start,end);
  }

  render() {
    return <div>
      <div id={"wavesurfer"} ref={this.waveContainerRef}/>
      {this.state.loadProgress !== 100 ? <span>{`加载中，进度${this.state.loadProgress}`}</span> : null}
      <Button onClick={this.play}>播放</Button>
      <Button onClick={this.pause}>暂停</Button>
      {/*<Wavesurfer*/}
        {/*pos={this.state.pos}*/}
        {/*onPosChange={this.onTimeUpdate}*/}
        {/*onPlay={this.onPlay}*/}
        {/*onPause={this.onPause}*/}
        {/*audioFile={this.props.url}*/}
        {/*playing={this.state.playing}*/}
      {/*/>*/}
    </div>;
  }
}
