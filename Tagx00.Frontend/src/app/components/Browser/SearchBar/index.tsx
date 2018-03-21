import * as React from "react";
import { Input, Tag } from "antd";
import { Localize } from "../../../internationalization/components";
import { ClickableTag } from "../../ClickableTag";
import { inject } from "mobx-react";
import { STORE_BROWSER } from "../BrowserStore";
import { observable } from "mobx";
import { BrowserProps } from "../../../stores/BrowserStore";

const Search = Input.Search;

const smallerDiv = {
  display: 'inline',
};

const centerAndPadding = {
  margin: '2%',
};


@inject(STORE_BROWSER)
@observable
export class SearchBar extends React.Component<BrowserProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearchAll = this.handleSearchAll.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
  };

  handleClick = (e) => {
    this.setState({
      searchValue: e.target.innerHTML
    });
    this.handleSearch();
  };

  handleSearch = () => {
    this.props[STORE_BROWSER].reverseBrowsing();
  };

  handleSearchAll = () => {
    this.props[STORE_BROWSER].reverseBrowsing();
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
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
                <ClickableTag onClick={this.handleClick} color="geekblue" value="主题词"/>
              </div>
            </div>
          );
        }
      }
      </Localize>
    )
  }
}
