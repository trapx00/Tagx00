import { UserStoreProps } from "../../../stores/UserStore";
import React from "react";
import { STORE_ROUTER, STORE_USER } from "../../../constants/stores";
import { Menu, Dropdown, Icon } from 'antd';
import { inject, observer } from "mobx-react";
import { RouterStoreProps } from "../../../routes/RouterStore";
import { LocaleMessage } from "../../../internationalization/components";

interface Props extends UserStoreProps, RouterStoreProps {

}

@inject(STORE_USER, STORE_ROUTER)
@observer
export class UserIndicator extends React.Component<Props, {}> {

  logout = () => {
    this.props[STORE_USER].logout();
  };

  render() {
    const userStore = this.props[STORE_USER];
    const dropdownMenu = <Menu>
      <Menu.Item key="logout">
        <a onClick={this.logout}><LocaleMessage id={"navbar.logout"}/></a>
      </Menu.Item>
    </Menu>;

    return <Dropdown overlay={dropdownMenu} trigger={["click"]}>
      <a className="ant-dropdown-link">
        <Icon type="user"/> <LocaleMessage id={"navbar.welcome"} replacements={{
        username: userStore.user.name
      }}/> <Icon type="down"/>
      </a></Dropdown>;
  }
}
