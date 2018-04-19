import * as React from "react";
import { Input, Tag } from "antd";
import { Localize } from "../../internationalization/components";
import { ClickableTag } from "../../components/ClickableTag";
import { observer } from "mobx-react";
import { BrowserStore } from "../../stores/BrowserStore";
import { Inject } from "react.di";
import { AsyncComponent } from "../../router/AsyncComponent";
import { Loading } from "../../components/Common/Loading";
import styled from "styled-components";

const Search = Input.Search;

const smallerDiv = {
  display: 'inline',
};

interface Props {
  // contentRef: React.RefObject<any>;
}

const centerAndPadding = {
  margin: '2%',
};


@observer
export class SearchBar extends React.Component<Props, any> {

  @Inject browserStore: BrowserStore;

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      open: false
    };
  };

  handleClick = async (e) => {
    this.setState({
      searchValue: e.target.innerHTML
    });
    await this.handleSearch();
  };

  handleSearch = async () => {
    this.browserStore.reverseBrowsing();
    await this.browserStore.search(this.state.searchValue);
  };

  handleSearchAll = () => {
    this.browserStore.reverseBrowsing();
  };

  setSearchValue = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  };

  renderTopics = async () => {
    await this.browserStore.fetchAllTopics();
    return this.browserStore.topics.map(
      (item) => {
        return <ClickableTag onClick={this.handleClick} color="geekblue" value={item.value}
                             key={item.topicId}/>
      }
    );
  };

  render() {
    return (
      <Localize replacements={{
        searchPlaceholder: "searchBar.searchPlaceholder",
        searchAll: "searchBar.searchAll"
      }}>{
        (props) => {
          return (
            <div style={{
              padding: '10%',
              margin: '5%'
            }}>
              <Search
                size="large"
                placeholder={props.searchPlaceholder}
                onPressEnter={this.handleSearch}
                onSearch={this.handleSearch}
                enterButton
                value={this.state.searchValue}
                onChange={this.setSearchValue}
              />
              <div style={centerAndPadding}>
                <Tag color="#108ee9">{props.searchAll}</Tag>
                <AsyncComponent render={this.renderTopics} componentWhenLoading={<Loading/>} />
              </div>
            </div>
          );
        }
      }
      </Localize>
    )
  }
}
