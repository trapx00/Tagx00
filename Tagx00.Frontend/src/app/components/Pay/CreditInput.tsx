import React from 'react';
import { Inject } from "react.di";
import { PayService } from "../../api/PayService";
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { FormItemProps } from "antd/lib/form/FormItem";
import { LocaleMessage } from "../../internationalization/components";
import { UserStore } from "../../stores/UserStore";
import { RichFormItem } from "../Form/RichFormItem";

export enum CreditStatus {
  Acceptable,
  WrongFormat,
  CreditsNotSufficient,
  Loading,
}


interface Props {
  initialValue?: number;
  onChanged(value: number, valid: boolean): void;
  availableCredits?: number;
  disabled?: boolean;
  getRemainingCredits?(): Promise<number>;
  showToPay?: boolean;
  toPayJumpTo?: string;
}

const ID_PREFIX = "pay.creditInput.";

interface State {
  value: string;
  creditStatus: CreditStatus;
  availableCredits: number;
}

export class CreditInput extends React.Component<Props, State> {

  static defaultProps = {
    initialValue: 0,
    toPayJumpTo: "/pay/account",
    availableCredits: -1,
    disabled: false,
    showToPay: true
  };

  @Inject payService: PayService;
  @Inject userStore: UserStore;

  state = {
    value: this.props.initialValue + "",
    creditStatus: CreditStatus.Loading,
    availableCredits: this.props.availableCredits,

  };

  componentDidMount() {
    if (this.state.availableCredits == -1) {
      const func = this.props.getRemainingCredits ||
        (async () => (await this.payService.getCredits()).credits);
      func().then(credits => {
        this.setState({
          availableCredits: credits,
          creditStatus: CreditInput.creditsStatus(this.state.value, credits)
        });
      })
    } else {
      this.setState({
        creditStatus: CreditInput.creditsStatus(this.state.value, this.state.availableCredits)
      })
    }
  }

  static creditsStatus(value: string, availableCredits: number) {
    if (value.indexOf(".") >= 0) {
      return CreditStatus.WrongFormat;
    }
    const parsedInt = parseInt(value);
    if (parsedInt > availableCredits) {
      return CreditStatus.CreditsNotSufficient;
    }
    if (!(parsedInt >= 0)) {
      return CreditStatus.WrongFormat;
    }
    return CreditStatus.Acceptable;
  }

  creditsMapStatusToFormProps = (status: CreditStatus): FormItemProps => {
    switch (status) {
      case CreditStatus.Loading:
        return {
          validateStatus: "success",
          help: <LocaleMessage id={ID_PREFIX + "loading"}/>
        };
      case CreditStatus.CreditsNotSufficient:
        return {
          validateStatus: "error",
          help: <LocaleMessage id={ID_PREFIX + "insufficient"} replacements={{
            current: this.state.availableCredits + "",
            goPay: this.props.showToPay ?
              <Link to={this.props.toPayJumpTo}><LocaleMessage id={ID_PREFIX + "goPay"}/></Link>
              : null
          }}/>
        };
      case CreditStatus.Acceptable:
        return {
          validateStatus: "success",
          help: <LocaleMessage id={ID_PREFIX + "remaining"} replacements={{
            current: this.state.availableCredits + "",
            goPay: this.props.showToPay ?
              <Link to={this.props.toPayJumpTo}><LocaleMessage id={ID_PREFIX + "goPay"}/></Link>
              : null
          }}/>,
        };
      case CreditStatus.WrongFormat:
        return {
          validateStatus: "error",
          help: <LocaleMessage id={ID_PREFIX + "format"}/>
        }
    }
  };

  onCreditsChanged = (e) => {
    const status = CreditInput.creditsStatus(e.target.value, this.state.availableCredits);
    this.props.onChanged(e.target.value, status == CreditStatus.Acceptable);
    this.setState({
      value: e.target.value,
      creditStatus: status
    });
  };


  render() {
    return <RichFormItem status={this.state.creditStatus}
                         mapToFormProps={this.creditsMapStatusToFormProps}
    >
      <Input addonBefore={<LocaleMessage id={ID_PREFIX + "prompt"}/>}
             disabled={this.props.disabled || this.state.availableCredits == -1}
             onChange={this.onCreditsChanged}
             value={this.state.value}
      />
    </RichFormItem>
  }
}
