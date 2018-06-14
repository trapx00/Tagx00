import React from 'react';
import { Divider, Input, Table } from 'antd';
import { LocaleMessage, Localize } from "../../../../internationalization/components";
import { ID_PREFIX } from "./index";
import { Inject } from "react.di";
import { LocaleStore } from "../../../../stores/LocaleStore";

const { Search } = Input;

const placements = {
    placeholder: "missions.requester.instancePanel.search.placeholder"
};

interface Props {
  missionId?: string;
  onSearch(missionId: string): void;
  onMissionIdChange(missionId: string): void;
}

interface State {
  missionId: string;
}

export class MissionInstanceSearch extends React.Component<Props, State> {

  state = {
    missionId: this.props.missionId
  };

  onSearchChange = (e) => {
    this.props.onMissionIdChange(e.target.value);
    this.setState({
      missionId: e.target.value
    });
  };

  onSearch = () => {
    this.props.onSearch(this.state.missionId);
  };

  render() {
    return  <Localize replacements={placements}>
      {props => <Search placeholder={props.placeholder}
                        value={this.state.missionId}
                        onChange={this.onSearchChange}
                        onSearch={this.onSearch}
                        enterButton/>
      }
    </Localize>
  }
}
