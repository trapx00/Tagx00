import React from "react";
import { Button, Form, Input, message, Radio } from 'antd';
import { Localize } from "../../../internationalization/components";
import { FormComponentProps } from "antd/lib/form";
import { observer } from "mobx-react";
import { RegisterStore } from "../../../stores/RegisterStore";
import { Inject } from "react.di";
import { register } from "ts-node";
import { UserRegisterResponse, UserService } from "../../../api/UserService";
import { UserRole } from "../../../models/User";
import { NetworkResponse } from "../../../api/HttpService";

interface RegisterFormProps extends FormComponentProps {
}

@observer
class RegisterTable extends React.Component<RegisterFormProps, any> {
  @Inject userService: UserService;
  @Inject registerStore: RegisterStore;

  constructor(props) {
    super(props);
    this.state = {
      role: "ROLE_WORKER",
      username: "",
      password: "",
      email: ""
    };
  };

  handleRoleSelect = (e) => {
    this.setState({
      role: e.target.value
    })
  };

  handleUsernameInput = (e) => {
    this.setState({
      username: e.target.value
    })
  };

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value
    })
  };

  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value
    })
  };

  handleSubmit = async () => {
    const res: NetworkResponse<UserRegisterResponse> = await this.userService.register(this.state.username, this.state.password, this.state.email, this.state.role);
    switch (res.statusCode) {
      case 201:
        this.registerStore.token = res.response.token;
        message.success('Register Success');
        this.registerStore.nextStep();
        break;
      case 400:
        message.error('Invalid email address');
        break;
      case 409:
        message.error('Username already exists');
        break;
      case 503:
        message.error('System error');
        break;
    }
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
              <Radio.Group defaultValue="ROLE_WORKER" onChange={this.handleRoleSelect}>
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
                <Input onChange={this.handleUsernameInput}/>
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
                <Input type="password" onChange={this.handlePasswordInput}/>
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
                <Input onChange={this.handleEmailInput}/>
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
