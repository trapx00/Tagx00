import React from 'react';
import { Inject } from "react.di";
import { Button, Input, Modal } from 'antd';
import { UserRole } from "../../models/user/User";
import { PayService } from "../../api/PayService";
import { LocaleMessage } from "../../internationalization/components";
import { requireLogin } from "../hoc/RequireLogin";
import { FormItem } from "../../components/Form/FormItem";
import { UserStore } from "../../stores/UserStore";

interface Props {
}

interface State {
  remainingCredits: number;
  input: string;
  paying: boolean;
}

function inputValid(str: string) {
  if (str.indexOf(".") >=0) {return false}
  const parsed = parseInt(str);
  return parsed > 0;
}

const ID_PREFIX = "pay.account.";

export class AccountPayPage extends React.Component<Props, State> {

  @Inject userStore: UserStore;

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
    const res = await this.payService.pay(parseInt(this.state.input), this.userStore.token);
    this.setState({ remainingCredits: res.remainingCredits, paying: false });
    Modal.success({
      title:"充值成功"
    });
  };

  loadCurrentCredits = async () => {
    const credits = (await this.payService.getCredits(this.userStore.token)).credits;
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
      <FormItem valid={inputValid(this.state.input)} messageOnInvalid={<LocaleMessage id={ID_PREFIX + "format"}/>}>
        <Input value={this.state.input} onChange={this.onValueChange}/>
      </FormItem>
      <Button loading={this.state.paying} type={"primary"} onClick={this.onSubmit}>
        <LocaleMessage id={ID_PREFIX + "submit"}/>
      </Button>
    </div>


  }
}
