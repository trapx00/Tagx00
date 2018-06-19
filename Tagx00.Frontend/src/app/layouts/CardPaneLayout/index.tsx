import React, { ReactNode } from 'react';
import { List } from 'antd';
import styled from "styled-components";

interface Props<T> {
  dataSource: T[];
  renderItem(item: T): ReactNode;
}


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
margin: 8px 8px 8px 8px
`;

export class CardPaneLayout<T> extends React.Component<Props<T>, {}> {

  renderItem = (instance: T) => {
    return <List.Item>
      {this.props.renderItem(instance)}
    </List.Item>
  };

  render() {
    return <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 6 }}
      dataSource={this.props.dataSource}
      renderItem={this.renderItem}
      pagination={{total: this.props.dataSource.length}}
    />
  }
}
