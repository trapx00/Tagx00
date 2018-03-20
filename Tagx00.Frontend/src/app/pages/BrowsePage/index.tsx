import React from "react"
import { Layout } from 'antd';
import { BaseLayout, UseBaseLayout } from "../../layouts/BaseLayout";

const { Header, Content, Footer } = Layout;

@UseBaseLayout
export class BrowsePage extends React.Component<any, any> {

  render() {
     return "browser";
  }
}

