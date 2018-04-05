import { Checkbox, Form, Icon, Input } from 'antd';
import React from 'react';
import { Localize } from "../../../internationalization/components";
import { inject, observer } from "mobx-react";
import { LoginFormFields } from "./LoginController";
import { action } from "mobx";
import { FormItemProps } from "antd/lib/form/FormItem";

const FormItem = Form.Item;

interface Props  {
  fields: LoginFormFields;
}
@observer
export class LoginForm extends React.Component<Props, {}> {


  @action onUsernameChange = (e) => {
    this.props.fields.username = e.target.value;
  };

  @action onPasswordChange = (e) => {
    this.props.fields.password = e.target.value;
  };

  @action onRememberChange = (e) => {
    this.props.fields.remember = e.target.checked;
  };

  formItemProps(valid: boolean, error: string): FormItemProps  {
    return {
      validateStatus: valid ? "success" : "error",
      help: valid? null : error
    };
  }

  render() {
    const {fields} = this.props;
    const props = {
      username: "loginModal.username",
      password: "loginModal.password",
      requireUsername: "loginModal.requireUsername",
      requirePassword: "loginModal.requirePassword",
      remember: "loginModal.remember",
      forgetPassword: "loginModal.forgetPassword"
    };
    return (
      <Localize replacements={props}>
        {
          props => <Form className="login-form">
            <FormItem {...this.formItemProps(fields.usernameValid, props.requireUsername)}>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                     onChange={this.onUsernameChange}
                     placeholder={props.username}
                     value={fields.username}
              />
            </FormItem>
            <FormItem {...this.formItemProps(fields.passwordValid, props.requirePassword)}
            >
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                     type="password"
                     onChange={this.onPasswordChange}
                     placeholder={props.password}
                     value={fields.password}
              />
            </FormItem>
            <FormItem>
              <Checkbox onChange={this.onRememberChange}
                        checked={fields.remember}
              >
                {props.remember}
                </Checkbox>
            </FormItem>
          </Form>
        }
      </Localize>
    );
  }
}
