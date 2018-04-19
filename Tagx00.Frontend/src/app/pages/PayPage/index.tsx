import React, { ReactNode } from 'react';
import { Inject } from "react.di";
import { Button, Form, Input, message } from 'antd';
import { UserRole } from "../../models/user/User";
import { FormItemProps } from "antd/lib/form/FormItem";
import { PayService } from "../../api/PayService";
import { LocaleMessage } from "../../internationalization/components";
import { requireLogin } from "../hoc/RequireLogin";

interface Props {
  token?: string;
  currentRole?: UserRole;
}

interface State {
  remainingCredits: number;
  input: string;
  paying: boolean;
}

function formItemProps(valid: boolean, error: ReactNode): FormItemProps  {
  return {
    validateStatus: valid ? "success" : "error",
    help: valid? null : error
  };
}

function inputValid(str: string) {
  if (str.indexOf(".") >=0) {return false}
  const parsed = parseInt(str);
  return parsed > 0;
}

const ID_PREFIX = "pay.";

@requireLogin(UserRole.ROLE_REQUESTER)
export class PaymentPage extends React.Component<Props, State> {

  state = {
    remainingCredits: null,
    input: "10",
    paying: false
  };

  @Inject payService: PayService;

  onValueChange = (e) => {
    this.setState({input: e.target.value});
  };

  onSubmit = async () => {
    this.setState({ paying: true});
    const res = await this.payService.pay(parseInt(this.state.input), this.props.token);
    this.setState({ remainingCredits: res.remainingCredits, paying: false });
    message.success("充值成功");
  };

  loadCurrentCredits = async () => {
    const credits = (await this.payService.getCredits(this.props.token)).credits;
    this.setState({ remainingCredits: credits});
  };

  componentDidMount() {
    this.loadCurrentCredits();
  }

  render() {
    return <div>
      <h1><LocaleMessage id={ID_PREFIX + "title"}/></h1>
      <p><LocaleMessage id={ID_PREFIX + "currentCredits"}/>
        {this.state.remainingCredits == null ? <LocaleMessage id={ID_PREFIX + "loading"}/> : this.state.remainingCredits}
        </p>
      <p><LocaleMessage id={ID_PREFIX + "inputCredits"}/></p>
      <Form.Item {...formItemProps(inputValid(this.state.input), <LocaleMessage id={ID_PREFIX + "format"}/>)}>
      <Input value={this.state.input} onChange={this.onValueChange}/>
      </Form.Item>
      <Button loading={this.state.paying} type={"primary"} onClick={this.onSubmit}>
        <LocaleMessage id={ID_PREFIX + "submit"}/>
      </Button>
    </div>


  }
}
