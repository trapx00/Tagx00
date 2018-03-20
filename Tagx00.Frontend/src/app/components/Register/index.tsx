import React from "react";
import { RegisterForm } from "./RegisterForm";
import { Col, Row } from 'antd';
import { inject, observer } from "mobx-react";
import { RegisterEmailSender } from "./RegisterEmailSender";
import { RegisterProps, STORE_REGISTER } from "./RegisterStore";

@inject(STORE_REGISTER)
@observer
export class Register extends React.Component<RegisterProps, any> {
    render() {
        const store = this.props[STORE_REGISTER];
        switch (store.currentStep) {
            case 0:
                return (<Row>
                    <Col span={12}>
                        <img id="logo" src={require('../../../assets/logo.png')}
                             alt="" style={{padding: '5%', paddingLeft: '20%'}}/>
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
            default:
                return null;
        }
    }
}
