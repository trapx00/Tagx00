import React from "react";
import { Button, Modal } from 'antd';
import { Localize } from "../../../internationalization/components";
import { inject, observer, Provider } from "mobx-react";
import { STORE_UI, STORE_USER } from "../../../constants/stores";
import { UiStore } from "../../../stores/UiStore";
import { LoginController } from "./LoginController";
import { LoginForm } from "./Form";
import { action } from "mobx";
import { UserStore } from "../../../stores/UserStore";
import { Inject } from "react.di";

interface Props  {

}

@observer
export class LoginModal extends React.Component<Props, any> {

  controller: LoginController = new LoginController();

  @Inject userStore: UserStore;
  @Inject uiStore: UiStore;

  onCancel = () => {
    this.uiStore.toggleLoginModalShown();
  };


  @action onOk = async () => {
    const {fields} = this.controller;
    fields.loginAttempted = true;
    if (fields.valid) {
      try {
        await this.controller.doLogin(this.userStore);
        this.uiStore.toggleLoginModalShown();
      } catch (e) {
        console.log(e);
      }
    }
  };

  render() {
    const props = {
      title: "loginModal.title",
      login: "loginModal.login",
      cancel: "loginModal.cancel"
    };

    return <Localize replacements={props}>
        {props =>
          <Modal visible={this.uiStore.loginModalShown}
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
            <LoginForm fields={this.controller.fields}/>
          </Modal>
        }
      </Localize>;
  }
}
