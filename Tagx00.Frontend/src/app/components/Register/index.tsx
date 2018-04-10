import React from "react";
import { RegisterForm } from "./RegisterForm";
import { Col, Row } from 'antd';
import { observer } from "mobx-react";
import { RegisterEmailSender } from "./RegisterEmailSender";
import { RegisterStore } from "../../stores/RegisterStore";
import { Inject } from "react.di";

import { RegisterSuccessShower } from "./RegisterSuccessShower";

@observer
export class Register extends React.Component<any, any> {
  @Inject registerStore: RegisterStore;

  render() {
    switch (this.registerStore.currentStep) {
      case 0:
        return (<Row>
          <Col span={12}>
            <img id="logo" src={require('../../../assets/logo.png')}
                 alt="" style={{padding: '5%', paddingLeft: '20%', width: '100%'}}/>
          </Col>
          <Col span={12}>
            <div style={{padding: '5%', paddingRight: '10%'}}>
              <RegisterForm/>
            </div>
          </Col>
        </Row>);
      case 1:
        return (
          <RegisterEmailSender/>
        );
      case 2:
        return (
          <RegisterSuccessShower/>
        );
      default:
        return null;
    }
  }
}
