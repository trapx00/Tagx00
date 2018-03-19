import React from "react";
import {Form, Input, Button, Radio, message} from 'antd';
import {Localize} from "../../../internationalization/components";
import {FormComponentProps} from "antd/lib/form";
import { inject, observer } from "mobx-react";
import { RegisterProps, STORE_REGISTER } from "../RegisterStore";

interface RegisterFormProps extends FormComponentProps, RegisterProps  {
}

@inject(STORE_REGISTER)
@observer
class RegisterTable extends React.Component<RegisterFormProps, any> {
    handleSubmit = () => {
        message.success('Register Success');
        this.props[STORE_REGISTER].nextStep();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 14},
        };
        const buttonItemLayout = {
            wrapperCol: {span: 14, offset: 4},
        };
        return (
            <Localize replacements={{
              submitLabel: "registerForm.submit",
              roleLabel: "registerForm.role",
              roleWorker: "registerForm.worker",
              roleRequester: "registerForm.requester",
              usernameLabel: "registerForm.username",
              usernameRequire: "registerForm.requireUsername",
              passwordLabel: "registerForm.password",
              passwordRequire: "registerForm.requirePassword",
              passwordConfirmLabel: "registerForm.confirmPassword",
              passwordNotEqual: "registerForm.notEqualPassword",
              passwordConfirmRequire: "registerForm.requireConfirmPassword",
              emailLabel: "registerForm.email",
              emailWrongFormat: "registerForm.wrongEmailFormat",
              emailRequire: "registerForm.requireEmail",
              passwordForgot: "registerForm.passwordForgot",
            }}
              >{
                (props) => {
                    return <Form layout="horizontal">
                        <Form.Item
                            label={props.roleLabel}
                            {...formItemLayout}
                        >
                            <Radio.Group defaultValue="ROLE_WORKER">
                                <Radio.Button value="ROLE_WORKER">{props.roleWorker}</Radio.Button>
                                <Radio.Button value="ROLE_REQUESTER">{props.roleRequester}</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label={props.usernameLabel}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true, message: props.usernameRequire,
                                }],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label={props.passwordLabel}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: props.passwordRequire,
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label={props.passwordConfirmLabel}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('passwordConfirm', {
                                rules: [{
                                    required: true, message: props.passwordConfirmRequire,
                                }, {
                                    validator: (rule, value, callback) => {
                                        const form = this.props.form;
                                        if (value && value !== form.getFieldValue('password')) {
                                            callback(props.passwordNotEqual);
                                        } else {
                                            callback();
                                        }
                                    },
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label={props.emailLabel}
                            {...formItemLayout}
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: props.emailWrongFormat,
                                }, {
                                    required: true, message: props.emailRequire,
                                }],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" size="large" style={{textAlign: 'center'}}
                                    onClick={this.handleSubmit}>{props.submitLabel}</Button>
                            <a href="#" style={{float: 'right'}}>{props.passwordForgot}</a>
                        </Form.Item>
                    </Form>
                }
            }
            </Localize>
        );
    }
}

export const RegisterForm = Form.create({})(RegisterTable);
