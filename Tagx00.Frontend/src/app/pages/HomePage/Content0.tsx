import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

interface Content0Props {
  isMode: boolean,
  key: string,
  className: string
  id: string
}

export class Content0 extends React.Component<Content0Props, any> {
  render() {
    const props = {...this.props};
    delete props.isMode;
    return (
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
            style={{marginLeft: '-85%', marginTop: '-10%'}}
          >
            <img width="100%" src="../../../assets/svg/tag_x00_logo.svg"/>
            <p>join us to tag the world</p>
          </span>
        </QueueAnim>
        <Button type="primary" ghost={true} size="large" key="button" style={{marginRight: '-60%', marginTop: '60%'}}>
          Learn More
        </Button>
        <TweenOne
          animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
          className={`${props.className}-icon`}
          key="icon"
        >
          <Icon type="down"/>
        </TweenOne>
      </OverPack>
    );
  }
}
