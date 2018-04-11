import React from "react";
import { Form } from 'antd';

export class DashboardPage extends React.Component<any, any> {
  //Q1：根据登录者身份显示不同的界面？路由
  render() {
      const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
      };

    return(

        <Form>
            <Form.Item
                {...formItemLayout}
                label="用户名:">
                <p className="ant-form-text" id="userName">123</p>
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="电子邮件:">
                d
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="经验:">
                <p className="ant-form-text" id="userName">123</p>
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="积分:">
                <p className="ant-form-text" id="userName">123</p>
            </Form.Item>
        </Form>)
  }
}
