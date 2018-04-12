import React, { ReactNode } from 'react';
import { List } from 'antd';

interface Props<T> {
  dataSource: T[];
  renderItem(item: T): ReactNode;
}

export class CardPaneLayout<T> extends React.Component<Props<T>, {}> {

  renderItem = (instance: T) => {
    return <List.Item>
      {this.props.renderItem(instance)}
    </List.Item>
  };

  render() {
    return <List
      grid={{ gutter: 16, xs: 1, sm: 2, xl: 3, xxl: 4 }}
      dataSource={this.props.dataSource}
      renderItem={this.renderItem}
    />
  }
}
