import React from "react";
import { Button, Modal } from 'antd';
import { Localize } from "../../../internationalization/components";
import { inject, observer, Provider } from "mobx-react";
import { STORE_UI, STORE_USER } from "../../../constants/stores";
import { UiStoreProps } from "../../../stores/UiStore";
import { LoginController } from "./LoginController";
import { LoginForm } from "./Form";
import { action } from "mobx";
import { UserStoreProps } from "../../../stores/UserStore";

interface Props extends UiStoreProps, UserStoreProps {

}




@inject(STORE_UI, STORE_USER)
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
    if (fields.valid) {
      try {
        await this.controller.doLogin(this.props[STORE_USER]);
        this.props[STORE_UI].toggleLoginModalShown();
      } catch (e) {
        console.log(e);
      }
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
      { props =>
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
        <LoginForm />
        </Modal>
      }
    </Localize>
    </Provider>;
  }
}
