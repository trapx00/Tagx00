import React, { ReactNode } from 'react';
import { List } from 'antd';
import styled from "styled-components";
import { PagingInfo } from "../../models/PagingInfo";

interface Props<T> {
  dataSource: T[];
  renderItem(item: T): ReactNode;
  pagination: PagingInfo;
  loading: boolean;
  onPageChange(page: number, pageSize: number): void;
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

  onChange = (page: number, pageSize: number) => {
    this.props.onPageChange(page, pageSize);
  };

  render() {
    const { dataSource, pagination } = this.props;


    console.log(dataSource, pagination);
    return <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 6 }}
      dataSource={dataSource}
      loading={this.props.loading}
      renderItem={this.renderItem}
      pagination={{
        current: pagination.currentPage,
        total: pagination.totalCount,
        pageSize: pagination.pageSize,
        onChange: this.onChange,
      }}
    />
  }
}
