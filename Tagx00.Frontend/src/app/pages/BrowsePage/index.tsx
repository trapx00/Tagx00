import * as React from "react";
import { Layout } from 'antd';
import { SearchBar } from "../../components/SearchBar";

const {Content} = Layout;

const fillContent = {
  minHeight: '300px'
}

export class BrowsePage extends React.Component<any, any> {
  render() {
    return (
      <div style={fillContent}>
        <SearchBar/>
      </div>
    )
  }
}
