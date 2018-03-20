import * as React from "react";
import { Button } from 'antd';
import { STORE_LOCALE, STORE_UI } from "../../../constants/stores";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import { UiStoreProps } from "../../../stores/UiStore";
import { LocaleMessage, Localize } from "../../../internationalization/components";
import { LocaleStore } from "../../../internationalization";
import { LocaleStoreProps } from "../../../internationalization/LocaleStore";
import { LoginModal } from "../../Modals/LoginModal";

interface Props extends UiStoreProps {

}

@inject(STORE_UI)
@observer
export class LoginButton extends React.Component<Props, {}>{

  render() {
    const ui = this.props[STORE_UI];
    const locale = this.props[STORE_LOCALE];
      return <div>
        <Localize replacements={{ text: "navbar.login"}}>
          {props => <Button onClick={ui.toggleLoginModalShown}>
              {props.text}
          </Button>
          }
        </Localize>
        <LoginModal/>
      </div>
    }
}
