import React from 'react';
import { Button, Icon, Spin } from 'antd';
import WaveSurfer from 'wavesurfer.js';
import { Loading } from "../../../../../components/Common/Loading";


interface Props {
  url: string;

  onPlay?(): void;

  onPause?(): void;

  setRef?(player: AudioPlayer): void;
}

const ID_PREFIX = "drawingPad.media.audioPlayer.";


interface State {
  loadProgress: number;
  playing: boolean;
  muted: boolean;
  progress: number;
}

export class AudioPlayer extends React.Component<Props, State> {

  state = {
    loadProgress: 0,
    playing: false,
    muted: false,
    progress: 0
  };

  // audioRef: HTMLAudioElement;
  waveContainerRef = React.createRef<HTMLDivElement>();

  waveSurfer;


  onPlay = () => {
    this.setState({playing: true});
    this.props.onPlay && this.props.onPlay();
  };

  onPause = () => {
    this.setState({playing: false});
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
    this.waveSurfer.on('loading', (progress) => this.setState({loadProgress: progress}));
    this.waveSurfer.on('audioprocess', (progress) => this.setState({progress: progress}));

    this.props.setRef && this.props.setRef(this);
  }

  componentWillUnmount() {
    this.waveSurfer.unAll();
    this.waveSurfer.stop();
  }

  get currentTime() {
    return this.waveSurfer.getCurrentTime();
  }

  playOrPause = () => {
    if (this.waveSurfer.isPlaying()) {
      this.waveSurfer.pause();
      this.setState({
        playing: false
      });
    } else {
      this.setState({
        playing: true
      });
      this.waveSurfer.play();
    }

  };

  get isPlaying() {
    return !!this.waveSurfer && this.waveSurfer.isPlaying();
  }

  playRegion(start: number, end: number) {
    this.waveSurfer.play(start, end);
  }


  toggleMute = () => {
    this.waveSurfer.toggleMute();
    this.setState(prev => ({
      muted: !prev.muted
    }));
  };


  render() {
    return <div style={{textAlign: "center"}}>
      <Spin spinning={this.state.loadProgress !== 100} tip={`${this.state.loadProgress}%`}>
        <div id={"wavesurfer"} ref={this.waveContainerRef}/>
        <Button onClick={this.playOrPause}><Icon type={this.state.playing ? "pause-circle" : "play-circle"}/></Button>
        <span>{this.state.progress.toFixed(2)} s</span>
      </Spin>
    </div>;
  }
}
