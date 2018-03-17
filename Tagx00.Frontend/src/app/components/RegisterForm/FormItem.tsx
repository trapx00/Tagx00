import React from "react";
import {Form, Input} from 'antd';
import {Localize} from "../../internationalization/components";
import {LocaleStoreProps} from "../../internationalization";

interface FormItemProps extends LocaleStoreProps {
    label: string,
    inputType: string,
    requireMessage: string,
    wrongMessage?: string,
    form?: any
}

export class FormItem extends React.Component<FormItemProps, any> {
    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return <Localize label={this.props.label} inputType={this.props.inputType}
                         wrongMessage={this.props.wrongMessage} requireMessage={this.props.requireMessage}>
            {props => {
                return <Form.Item
                    {...formItemLayout}
                    label={props.label}
                >
                    {
                        getFieldDecorator(props.inputType, {
                            rules: [{
                                type: props.inputType, message: props.wrongMessage,
                            }, {
                                required: true, message: props.requireMessage,
                            }],
                        })(
                            <Input type={props.inputType}/>
                        )
                    }}
                </Form.Item>
            }}
        </Localize>
    }
}