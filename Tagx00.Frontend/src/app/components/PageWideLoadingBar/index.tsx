import React from 'react';
import styled from "styled-components";
import { waitForMs } from "../../../utils/Wait";

const defaultProps = {
  height: 2,
  hideDelay: .4,
  speed: .4,
  incrementInterval: 0.5,
  increment: 10
};

interface Props {
  show: boolean;
}

interface State {
  percent: number;
  started: boolean;
}


interface InnerProps {
  percent: number;
}

const Container = styled.div`
  opacity: ${(props: InnerProps) => props.percent < 100 ? 1 : 0};
  transition: ${defaultProps.speed}s opacity;
  transition-delay: ${(props: InnerProps) => props.percent < 100 ? 0 : defaultProps.hideDelay}s
`;

const Bar = styled.div`
   display: inline-block;
    position: fixed;
    top: 0;
    left: 0;
    width: ${(props: InnerProps) =>props.percent}%;
    max-width: 100% !important;
    height: ${defaultProps.height}px;
    box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
    border-radius: 0 1px 1px 0;
    transition: ${defaultProps.speed}s width, ${defaultProps.speed}s background-color;
    background-image: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #FF2D55);
    background-size: 100vw ${defaultProps.height}px;
    z-index: 5;
`;

export class PageWideLoadingBar extends React.Component<Props, State> {

  timer;

  state = {
    percent: 0,
    started: false
  };

  increment = async () => {
    if (this.state.percent<=100) {
      this.setState((prev) => ({percent: prev.percent + defaultProps.increment}));
    }
  };

  static getDerivedStateFromProps(nextProps: Props) {
    if (!nextProps.show) {
      return {percent: 0, started: false};
    }
    return { percent: 0};
  }

  componentDidUpdate() {
    if (this.props.show && !this.state.started) {
      clearInterval(this.timer);
      this.timer = setInterval(this.increment, defaultProps.incrementInterval*1000);
      this.setState({ started: true });
    }else if (!this.props.show && this.state.started) {
      clearInterval(this.timer);
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <Container percent={this.state.percent}>
        <Bar percent={this.state.percent}/>
      </Container>
    );
  }

}
