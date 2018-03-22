import React from "react";
import { Button, Modal } from 'antd';
import { Localize } from "../../../internationalization/components";
import { inject, observer, Provider } from "mobx-react";
import { STORE_UI, STORE_USER } from "../../../constants/stores";
import { UiStoreProps } from "../../../stores/UiStore";
import { LoginController } from "./LoginController";
import { LoginForm } from "./Form";
import { action, runInAction } from "mobx";
import { LoginResult } from "../../../api/UserService";

interface Props extends UiStoreProps {

}


@inject(STORE_USER, STORE_UI)
@observer
export class LoginModal extends React.Component<Props, any> {

  controller: LoginController = new LoginController();

  onCancel = () => {
    const store = this.props[STORE_UI];
    store.toggleLoginModalShown();
  };

  @action onOk = async () => {
    const {fields} = this.controller;
    fields.loginAttempted = true;
    if (fields.validate) {
      console.log(fields);
      const loginResult: LoginResult = await this.controller.requestLogin(fields.username, fields.password);
      runInAction(() => {
        const user = this.props[STORE_USER];
        user.login(loginResult);
      })
    } else {
      console.log("error");
    }
  };

  render() {
    const store = this.props[STORE_UI];
    const props = {
      title: "loginModal.title",
      login: "loginModal.login",
      cancel: "loginModal.cancel"
    };

    return <Provider fields={this.controller.fields}>
      <Localize replacements={props}>
        {props =>
          <Modal visible={store.loginModalShown}
                 title={props.title}
                 onCancel={this.onCancel}
                 onOk={this.onOk}
                 footer={[
                   <Button key="back" onClick={this.onCancel}>
                     <span>{props.cancel}</span>
                   </Button>,
                   <Button key="submit" type="primary" loading={this.controller.loggingIn} onClick={this.onOk}>
                     <span>{props.login}</span>
                   </Button>
                 ]}
          >
            <LoginForm/>
          </Modal>
        }
      </Localize>
    </Provider>;
  }
}
