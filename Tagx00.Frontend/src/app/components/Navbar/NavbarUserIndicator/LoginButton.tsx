import React from "react";
import { Button } from 'antd';
import { STORE_LOCALE, STORE_UI, STORE_USER } from "../../../constants/stores";
import { inject, observer } from "mobx-react";
import { UiStoreProps } from "../../../stores/UiStore";
import { Localize } from "../../../internationalization/components";
import { UserStoreProps } from "../../../stores/UserStore";

interface Props extends UiStoreProps, UserStoreProps {

}

@inject(STORE_UI, STORE_USER)
@observer
export class LoginButton extends React.Component<Props, {}>{

  onButtonClick = () => {
    // const ui = this.props[STORE_UI];
    // ui.toggleLoginModalShown();

    const user = this.props[STORE_USER];
    user.login({
        token: "123",
        username: "test",
        role: "WORKER"
    });
  };

  render() {

    const locale = this.props[STORE_LOCALE];
      return <Localize replacements={{ text: "navbar.login"}}>
          {props => <Button onClick={this.onButtonClick}>
              {props.text}
          </Button>
          }
        </Localize>

    }
}
