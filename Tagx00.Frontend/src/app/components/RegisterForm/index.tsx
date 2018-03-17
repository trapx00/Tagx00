import {Form, Input, Button} from 'antd';
import * as React from "react";
import {FormItem} from "./FormItem";

interface RegisterFormProps {
    form?: any
}

export class RegisterForm extends React.Component<RegisterFormProps, any> {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label={"registerForm.username"} inputType="username"
                          requireMessage={"registerForm.requireUsername"}/>
                <FormItem label={"registerForm.password"} inputType="password"
                          requireMessage={"registerForm.requirePassword"}/>
                <FormItem label={"registerForm.confirmPassword"} inputType="password"
                          wrongMessage={"registerForm.notEqualPassword"}
                          requireMessage={"registerForm.requireConfirmPassword"}/>
                <FormItem label={"registerForm.email"} inputType="email"
                          wrongMessage={"registerForm.wrongEmailFormat"}
                          requireMessage={"registerForm.requireEmail"}/>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
        )
            ;
    }
}
