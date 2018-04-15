import React, { ReactNode } from 'react';
import { Inject } from "react.di";
import { Input,Form, Button, message } from 'antd';
import { UserStore } from "../../stores/UserStore";
import { UserRole } from "../../models/user/User";
import { AsyncComponent } from "../../router/AsyncComponent";
import { FormItemProps } from "antd/lib/form/FormItem";
import { PayService } from "../../api/PayService";
import { waitForMs } from "../../../utils/Wait";
import { LocaleMessage } from "../../internationalization/components";

interface Props {

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

export class PaymentPage extends React.Component<Props, State> {

  state = {
    remainingCredits: null,
    input: "10",
    paying: false
  };

  @Inject userStore: UserStore;
  @Inject payService: PayService;

  onValueChange = (e) => {
    this.setState({input: e.target.value});
  };

  onSubmit = async () => {
    this.setState({ paying: true});
    const res = await this.payService.pay(parseInt(this.state.input), this.userStore.token);
    this.setState({ remainingCredits: res.remainingCredits, paying: false });
    message.success("充值成功");
  };

  loadCurrentCredits = async () => {
    const credits = (await this.payService.getCredits(this.userStore.token)).credits;
    this.setState({ remainingCredits: credits});
  };

  componentDidMount() {
    this.loadCurrentCredits();
  }

  render() {
    if (!this.userStore.loggedIn) {
      return "login first";
    }

    if (this.userStore.user.role !== UserRole.ROLE_REQUESTER) {
      return "only requester can pay for now."
    }

    return <div>
      <h1><LocaleMessage id={ID_PREFIX + "title"}/></h1>
      <p><LocaleMessage id={ID_PREFIX + "currentCredits"}/>{this.state.remainingCredits == null ? <LocaleMessage id={ID_PREFIX + "loading"}/> : this.state.remainingCredits}</p>
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
