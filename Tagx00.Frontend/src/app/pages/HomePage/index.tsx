import React from 'react';
import { enquireScreen } from 'enquire-js';

import { HomePageContent } from './HomePageContent';
import { Module } from "react.di";
import { HomeStore } from "../../stores/HomeStore";
import { Footer } from "../../components/Footer";

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

interface State {
  isMobile: boolean;
  show: boolean;
}

@Module({
  providers: [
    HomeStore
  ]
})
export default class HomePage extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      show: !location.port,
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({isMobile: !!b});
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
  }

  render() {
    const children = [
      <HomePageContent id="content_0_0" key="content_0_0" isMobile={this.state.isMobile} className="banner0"/>,
      <Footer key={"footer"} isMobile={this.state.isMobile}/>,
  ];
    if (this.state.show) {
      return (
        <div className="templates-wrapper">
          {children}
        </div>)
    }
    else {
      return (
        <div className="templates-wrapper">
        </div>
      );
    }
  }
}
