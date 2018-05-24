import React from 'react';
import { Inject } from "react.di";
import { PayService } from "../../api/PayService";
import { AsyncComponent } from "../../router/AsyncComponent";

interface Props {
  token: string;
  onCreditFetched: (credits:number)=>void;
  className?: string;
}

export class CurrentCreditsIndicator extends React.Component<Props, {}> {

  @Inject payService: PayService;

  fetchDataAndRender = async () => {
    const res = await this.payService.getCredits();
    this.props.onCreditFetched && this.props.onCreditFetched(res.credits);
    return <span className={this.props.className}>
      {res.credits}
    </span>
  };

  render() {
    return <AsyncComponent render={this.fetchDataAndRender}/>
  }
}
