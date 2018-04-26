import React from "react"
import { Localize } from "../../internationalization/components/index";
import { Button, Icon, Input, message } from "antd";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { RegisterStore } from "./RegisterStore";

interface State {
  code: string;
}

@observer
export class RegisterEmailSender extends React.Component<{}, State> {
  @Inject registerStore: RegisterStore;

  state = {
    code: ""
  };

  handleConfirm = async () => {
    const res = await this.registerStore.validateEmailCode(this.state.code);
    switch (res) {
      case 200:
        this.registerStore.nextStep();
        message.success('code confirmed');
        break;
      case 400:
        message.error('code does not match');
        break;
      case 404:
        message.error('user does not exist');
        break;
    }
  };

  handleCodeInput = (e) => {
    this.setState({
      code: e.target.value
    });
  };

  render() {
    return (
      <Localize replacements={{}}>{
        (props) => {
          return (
            <div style={{textAlign: 'center'}}>
              <Icon type="mail" style={{fontSize: 200, color: '#08c'}}/>
              <div style={{padding: "30%", paddingTop: "10%"}}>
                <h3>邮件已发送，请输入验证码</h3>
                <Input size="large" placeholder="验证码" onChange={this.handleCodeInput}/>
                <div style={{margin: "5%"}}>
                  <Button type="primary" size="large" onClick={this.handleConfirm}>确认</Button>
                </div>
              </div>
            </div>);
        }
      }
      </Localize>)
  }
}
