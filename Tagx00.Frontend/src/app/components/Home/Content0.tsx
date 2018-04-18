import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Inject } from "react.di";
import { HomeStore } from "../../stores/HomeStore";
import { observer } from "mobx-react";

interface Content0Props {
  isMode: boolean,
  key: string,
  className: string
  id: string
}

@observer
export class Content0 extends React.Component<Content0Props, any> {

  @Inject homeStore: HomeStore;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;

  constructor(props: any, context: any) {
    super(props, context);
  }

  ref = (ref) => {
    this.canvas = ref;
    if (ref) {
      this.canvasContext = this.canvas.getContext("2d");
    }

  };

  resizeCanvas = () => {
    this.homeStore.bodyWidth = document.body.clientWidth;
    this.homeStore.bodyHeight = document.body.clientHeight;
  };

  resizeLine = () => {
    const scrollHeight: number = document.body.scrollTop + document.documentElement.scrollTop;
    const bodyHeight: number = document.body.clientHeight;
    if (scrollHeight <= bodyHeight * 0.4) {
      this.homeStore.endLine = bodyHeight * 0.8 - bodyHeight * 0.3 * (bodyHeight * 0.4 - scrollHeight) / (bodyHeight * 0.4);
      this.homeStore.centerLine = bodyHeight * 0.8 - bodyHeight * 0.1 * (bodyHeight * 0.4 - scrollHeight) / (bodyHeight * 0.4);
    } else {
      this.homeStore.endLine = bodyHeight * 0.8;
      this.homeStore.centerLine = bodyHeight * 0.8;
    }
    this.drawBackground();
  };

  drawBackground = () => {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    const lineStyle: string = "#006FF0";
    const startX = 0;
    const startY = document.body.clientHeight * 0.8;
    const endX = document.body.clientWidth;
    const endY = this.homeStore.endLine;
    const centX = this.homeStore.centerLine;
    const centY = this.homeStore.centerLine;
    this.canvasContext.fillStyle = lineStyle;
    this.canvasContext.strokeStyle = lineStyle;
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(startX, startY);
    this.canvasContext.quadraticCurveTo(centX, centY, endX, endY);
    this.canvasContext.lineTo(document.body.clientWidth, document.body.clientHeight);
    this.canvasContext.lineTo(0, document.body.clientHeight);
    this.canvasContext.lineTo(0, startY);
    this.canvasContext.closePath();
    this.canvasContext.fill();
    this.canvasContext.stroke();
  }

  componentDidMount() {
    this.resizeCanvas();
    this.resizeLine();
    this.drawBackground();
  };

  render() {
    window.onscroll = this.resizeLine;
    window.onresize = this.resizeCanvas;
    const props = {...this.props};
    delete props.isMode;
    const canvasWidth = this.homeStore.bodyWidth;
    const canvasHeight = this.homeStore.bodyHeight;
    return (
      <div>
        <canvas ref={this.ref}
                style={{position: "absolute", zIndex: -2, width: canvasWidth, height: canvasHeight}}/>
        <OverPack
          replay
          playScale={[0.3, 0.1]}
          {...props}
        >
          <QueueAnim
            type={['bottom', 'top']}
            delay={200}
            className={`${props.className}-wrapper`}
            key="text"
            id={`${props.id}-wrapper`}
          >
          <span
            className="title"
            key="title"
            id={`${props.id}-title`}
            style={{left: '-20%', margin: '10%'}}
          >
            <img width="100%" src="../../../assets/svg/tag_x00_logo.svg"/>
          </span>
          </QueueAnim>
          <QueueAnim
            type={['bottom', 'top']}
            delay={200}
            className={`${props.className}-wrapper`}
          >
            <Button ghost={true} size="large" key="button"
                    style={{right: '-20%', margin: '-40%', marginBottom: '-15%'}}>
              Learn More
            </Button>
          </QueueAnim>
          <TweenOne
            animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
            className={`${props.className}-icon`}
            key="icon"
          >
            <Icon type="down"/>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}
