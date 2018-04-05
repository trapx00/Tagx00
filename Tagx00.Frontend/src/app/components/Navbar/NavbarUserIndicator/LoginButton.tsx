import React from "react";
import { Button } from 'antd';
import { observer } from "mobx-react";
import { UiStore } from "../../../stores/UiStore";
import { Localize } from "../../../internationalization/components";
import { Inject } from "react.di";

interface Props  {

}

@observer
export class LoginButton extends React.Component<Props, {}>{

  @Inject uiStore: UiStore;

  onButtonClick = () => {
    this.uiStore.toggleLoginModalShown();
    //
    // const user = this.props[STORE_USER];
    // user.login({
    //     token: "123",
    //     username: "test",
    //     jwtRoles: ["ROLE_WORKER"],
    //     email: "1@1.com"
    // });
  };

  render() {
      return <Localize replacements={{ text: "navbar.login"}}>
          {props => <Button onClick={this.onButtonClick}>
              {props.text}
          </Button>
          }
        </Localize>

    }
}
