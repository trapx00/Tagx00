import { UserStore } from "../../../stores/UserStore";
import React from "react";
import { Dropdown, Avatar, Icon, Menu } from 'antd';
import { observer } from "mobx-react";
import { LocaleMessage } from "../../../internationalization/components/index";
import { Link } from "react-router-dom";
import { Inject } from "react.di";

interface Props {

}

@observer
export class UserIndicator extends React.Component<Props, {}> {

  @Inject userStore: UserStore;

  logout = () => {
    this.userStore.logout();
  };

  render() {
    const dropdownMenu = <Menu>
      <Menu.Item key="self">
        <Link to={"/self"}><LocaleMessage id={"navbar.selfCenter"}/></Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <a onClick={this.logout}><LocaleMessage id={"navbar.logout"}/></a>
      </Menu.Item>
    </Menu>;

    return <Dropdown overlay={dropdownMenu} trigger={["click"]}>
      <a className="ant-dropdown-link">
        <Avatar size="small" src={this.userStore.user.avatarUrl}/> <LocaleMessage id={"navbar.welcome"} replacements={{
        username: this.userStore.user.username
      }}/> <Icon type = "down"/>
      </a></Dropdown>;
  }
}
