import React from "react";
import { Button, Form, Input, message, Radio } from 'antd';
import { Localize } from "../../internationalization/components";
import { FormComponentProps } from "antd/lib/form";
import { observer } from "mobx-react";
import { RegisterFormData, RegisterStore } from "./RegisterStore";
import { Inject } from "react.di";
import { UserRole } from "../../models/user/User";

interface RegisterFormProps extends FormComponentProps {
}

type State = RegisterFormData & { registering: boolean };

@observer
class RegisterTable extends React.Component<RegisterFormProps, State> {
  @Inject registerStore: RegisterStore;

  state = {
    role: UserRole.ROLE_WORKER,
    username: "",
    password: "",
    email: "",
    registering: false
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
    this.setState({ registering: true});
    const res = await this.registerStore.submitInfo(this.state);
    this.setState({ registering: false});
    switch (res) {
      case 201:
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
              <Button loading={this.state.registering}  type="primary" size="large" style={{textAlign: 'center'}}
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
