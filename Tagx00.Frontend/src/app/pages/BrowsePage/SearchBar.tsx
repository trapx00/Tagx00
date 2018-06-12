import * as React from "react";
import { Input, Tag } from "antd";
import { Localize } from "../../internationalization/components";
import { ClickableTag } from "../../components/ClickableTag";
import { observer } from "mobx-react";
import { BrowserStore } from "../../stores/BrowserStore";
import { Inject } from "react.di";
import { AsyncComponent } from "../../router/AsyncComponent";
import { Loading } from "../../components/Common/Loading";

const Search = Input.Search;
interface Props {
  // contentRef: React.RefObject<any>;
}


interface State {
  searchValue: string;
}

@observer
export class SearchBar extends React.Component<Props, State> {

  @Inject browserStore: BrowserStore;

  state = {
    searchValue: "",
  };

  handleClick = async (tag: string) => {
    this.setState({
      searchValue: tag
    });
    await this.handleSearch();
  };

  handleSearch = async () => {
    await this.browserStore.search(this.state.searchValue);
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
        return <ClickableTag onClick={() => this.handleClick(item.value)} color="geekblue" value={item.value}
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
            <div>
              <Search
                size="large"
                placeholder={props.searchPlaceholder}
                onPressEnter={this.handleSearch}
                onSearch={this.handleSearch}
                enterButton
                value={this.state.searchValue}
                onChange={this.setSearchValue}
              />
              <div>
                <Tag color="#108ee9">{props.searchAll}</Tag>
                <AsyncComponent render={this.renderTopics} componentWhenLoading={<Loading/>}/>
              </div>
            </div>
          );
        }
      }
      </Localize>
    )
  }
}
