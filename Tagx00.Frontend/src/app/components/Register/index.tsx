import React from "react";
import {registerStore} from "./RegisterStore";
import {RegisterForm} from "../../components/Register/RegisterForm";
import {Row, Col} from 'antd';
import {observer} from "mobx-react";
import {RegisterEmailSender} from "./RegisterEmailSender";

@observer
export class Register extends React.Component<any, any> {
    render() {
        switch (registerStore.currentStep) {
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