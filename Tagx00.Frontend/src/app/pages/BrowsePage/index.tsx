import * as React from "react";
import { SearchBar } from "../../components/SearchBar";
import { BrowserMissionList } from "../../components/BrowserMissionList";

const fillContent = {
  minHeight: '300px'
}

export class BrowsePage extends React.Component<any, any> {
  render() {
    return (
      <div style={fillContent}>
        <SearchBar/>
        <BrowserMissionList/>
      </div>
    )
  }
}
