import React from "react"
import { Localize } from "../../../internationalization/components";
import { Button, Icon, Input } from "antd";
import { inject, observer } from "mobx-react";
import { STORE_REGISTER } from "../RegisterStore";

@inject(STORE_REGISTER)
@observer
export class RegisterEmailSender extends React.Component<any, any> {
  handleConfirm = () => {
    this.props[STORE_REGISTER].nextStep();
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
                <Input size="large" placeholder="验证码"/>
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
