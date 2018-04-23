import React, { ReactNode } from 'react';
import { MissionFinalizeParameters } from "../../../../models/instance/MissionFinalizeParameters";
import { FormItemProps } from "antd/lib/form/FormItem";
import { Form, Input, Icon } from 'antd';
import { LocaleMessage, Localize } from "../../../../internationalization/components";
import { observer } from "mobx-react";
import { action } from "mobx";
import { RichFormItem } from "../../../../components/Form/RichFormItem";
import { Link } from 'react-router-dom';
import { FormItem } from "../../../../components/Form/FormItem";
import { CreditInput } from "../../../../components/Pay/CreditInput";
import { Inject } from "react.di";

interface Props {
  value: MissionFinalizeParameters;
  readonly: boolean;
  missionId: string;

  getAvailableCredits(): Promise<number>;
}


const ID_PREFIX = "missions.requester.instancePanel.finalize.";

const props = [
  "expRatio",
  "credits",
  "comment",
  "requireExpRatio",
  "requireCredits"
].reduce((prev, curr) => ({...prev, [curr]: ID_PREFIX + curr}), {});


@observer
export class FinalizeForm extends React.Component<Props, {}> {

  @action onCreditsChange = (value, valid) => {

    this.props.value.credits = value;
    this.props.value.creditsValid = valid;
  };

  @action onExpRadioChange = (e) => {
    this.props.value.expRatio = e.target.value;
  };

  @action onCommentChange = (e) => {
    this.props.value.comment = e.target.value;
  };


  render() {
    const {value} = this.props;
    return <Localize replacements={props}>
      {
        props => <Form className="login-form">
          <FormItem valid={value.expRadioValid} messageOnInvalid={props.requireExpRatio}>
            <Input addonBefore={props.expRatio}
                   disabled={this.props.readonly}
                   onChange={this.onExpRadioChange}
                   placeholder={props.expRatio}
                   value={value.expRatio}
            />
          </FormItem>
          {this.props.readonly
            ? <FormItem valid={true} messageOnInvalid={null}>
              <Input addonBefore={props.credits}
                     readOnly={true}
                     value={value.credits}
              />
            </FormItem>
            :
            <CreditInput onChanged={this.onCreditsChange}
                         getRemainingCredits={this.props.getAvailableCredits}
                         toPayJumpTo={`/pay/mission?missionId=${this.props.missionId}`}
            />
          }
          <FormItem valid={true} messageOnInvalid={null}>
            <Input.TextArea
              disabled={this.props.readonly}
              onChange={this.onCommentChange}
              placeholder={props.comment}
              value={value.comment}
            />
          </FormItem>
        </Form>
      }
    </Localize>
  }
}
