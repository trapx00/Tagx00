import React from "react"
import { Localize } from "../../../internationalization/components";
import { Button, Icon, Input, message } from "antd";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { RegisterStore } from "../../../stores/RegisterStore";
import { UserRegisterConfirmationResponse, UserService } from "../../../api/UserService";
import { NetworkResponse } from "../../../api/HttpService";

@observer
export class RegisterEmailSender extends React.Component<any, any> {
  @Inject userService: UserService;
  @Inject registerStore: RegisterStore;

  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  };

  handleConfirm = async () => {
    const res: NetworkResponse<UserRegisterConfirmationResponse> = await this.userService.registerValidate(this.registerStore.token, this.state.code);
    switch (res.statusCode) {
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
