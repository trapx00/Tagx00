import * as React from "react";
import { Input, Tag } from "antd";
import { Localize } from "../../../internationalization/components";
import { ClickableTag } from "../../ClickableTag";
import { observer } from "mobx-react";
import { BrowserStore } from "../../../stores/BrowserStore";
import { Inject } from "react.di";

const Search = Input.Search;

const smallerDiv = {
  display: 'inline',
};

const centerAndPadding = {
  margin: '2%',
};

@observer
export class SearchBar extends React.Component<{}, any> {

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
    this.browserStore.startBrowsing();
    await this.browserStore.search(this.state.searchValue);
  };

  handleSearchAll = () => {
    this.browserStore.startBrowsing();
  };

  setSearchValue = (e) => {
    this.setState({
      searchValue: e.target.value
    })
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
                <div onClick={this.handleSearchAll} style={smallerDiv}>
                  <Tag color="#108ee9">{props.searchAll}</Tag>
                </div>
                {this.browserStore.topics.map(
                  (item) => {
                    return <ClickableTag onClick={this.handleClick} color="geekblue" value={item.value}
                                         key={item.topicId}/>
                  }
                )}
              </div>
            </div>
          );
        }
      }
      </Localize>
    )
  }
}
