<<<<<<< HEAD
import * as React from "react";
import { SearchBar } from "../../components/SearchBar";
import { BrowserMissionList } from "../../components/BrowserMissionList";

const fillContent = {
  minHeight: '300px'
}
=======
import React from "react"
import { Layout } from 'antd';
import { BaseLayout, UseBaseLayout } from "../../layouts/BaseLayout";

const { Header, Content, Footer } = Layout;

@UseBaseLayout
export class BrowsePage extends React.Component<any, any> {
>>>>>>> e7feabbc3c212e0240ae99816f777924a6089b74

export class BrowsePage extends React.Component<any, any> {
  render() {
<<<<<<< HEAD
    return (
      <div style={fillContent}>
        <SearchBar/>
        <BrowserMissionList/>
      </div>
    )
=======
     return "browser";
>>>>>>> e7feabbc3c212e0240ae99816f777924a6089b74
  }
}
