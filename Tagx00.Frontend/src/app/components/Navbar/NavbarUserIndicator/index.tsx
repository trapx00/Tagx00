import React from "react";
import { inject, observer } from "mobx-react";
import { STORE_UI, STORE_USER } from "../../../constants/stores";
import { UserStoreProps } from "../../../stores/UserStore";
import { LoginButton } from "./LoginButton";
import { UserIndicator } from "./UserIndicator";

@inject(STORE_USER)
@observer
export class NavbarUserIndicator extends React.Component<UserStoreProps, any> {
  render() {
    const store = this.props[STORE_USER];
    if (store.loggedIn) {
      return <UserIndicator/>;
    } else {
      return <LoginButton/>;
    }
  }
}
