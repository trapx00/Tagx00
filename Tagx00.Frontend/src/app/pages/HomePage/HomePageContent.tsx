import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Inject } from "react.di";
import { HomeStore } from "../../stores/HomeStore";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Link } from 'react-router-dom';
import { LocaleMessage } from "../../internationalization/components";

interface Content0Props {
  isMobile: boolean;
  key: string;
  className: string;
  id: string;
}

@observer
export class HomePageContent extends React.Component<Content0Props, any> {

  @Inject homeStore: HomeStore;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;


  ref = (ref) => {
    this.canvas = ref;
    if (ref) {
      this.canvasContext = this.canvas.getContext("2d");
    }

  };

  @action resizeCanvas = () => {
    this.homeStore.bodyWidth = document.body.clientWidth;
    this.homeStore.bodyHeight = document.body.clientHeight;
  };

  @action resizeLine = () => {
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
  };

  componentDidMount() {
    window.onscroll = this.resizeLine;
    window.onresize = this.resizeCanvas;
    this.resizeCanvas();
    this.resizeLine();
    this.drawBackground();
  };

  componentWillUnmount() {
    window.onscroll = null;
    window.onresize = null;
  }

  render() {
    const canvasWidth = this.homeStore.bodyWidth;
    const canvasHeight = this.homeStore.bodyHeight;

    const props = {...this.props};
    const isMobile = props.isMobile;
    delete props.isMobile;

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
            className={`${this.props.className}-wrapper`}
            key="text"
            id={`${this.props.id}-wrapper`}
          >
          <span
            className="title"
            key="title"
            id={`${this.props.id}-title`}
            style={{left: '-20%', margin: '10%'}}
          >
            <img width="100%" src="../../../assets/svg/tag_x00_logo.svg"/>
          </span>
          </QueueAnim>
          <QueueAnim
            type={['bottom', 'top']}
            delay={200}
            className={`${this.props.className}-wrapper`}
          >
            <Link to={"/browse"}>
            <Button ghost={true} size="large" key="button"
                    style={{right: '-20%', margin: '-40%', marginBottom: '-15%'}}>
              <LocaleMessage id={"home.enter"}/>
            </Button>
            </Link>
          </QueueAnim>

          <TweenOne
            animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
            className={`${this.props.className}-icon`}
            key="icon"
          >
            <Icon type="down"/>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}
