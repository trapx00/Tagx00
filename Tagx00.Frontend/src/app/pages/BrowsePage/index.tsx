import React from "react";
import { Inject } from "react.di";
import { BrowserStore } from "../../stores/BrowserStore";
import { BrowserMissionList } from "./BrowserMissionList";
import { SearchBar } from "./SearchBar";
import styled from "styled-components";


const BigContainer = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
`;

export default class BrowsePage extends React.Component<any, any> {
  @Inject browserStore: BrowserStore;


  componentDidMount() {
    this.browserStore.search("");
  }

  render() {

    return <BigContainer>
      <SearchBar/>
      <BrowserMissionList/>
    </BigContainer>
  }
}
