import React from "react";
import { Layout } from 'antd';

export class Footer extends React.Component<any, any> {
  render() {
    return <Layout.Footer style={{ textAlign: 'center' }}>
      <p>Copyright 2018 by Trap x00</p>
    </Layout.Footer>
  }
}
