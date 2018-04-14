import React from 'react';
import { MissionFinalizeParameters } from "../../../../models/instance/MissionFinalizeParameters";
import { FormItemProps } from "antd/lib/form/FormItem";
import { Form, Input, Icon } from 'antd';
import { Localize } from "../../../../internationalization/components";
import { observer } from "mobx-react";
import { action } from "mobx";
const FormItem = Form.Item;

interface Props {
  value: MissionFinalizeParameters;
  readonly: boolean;
}

function formItemProps(valid: boolean, error: string): FormItemProps  {
  return {
    validateStatus: valid ? "success" : "error",
    help: valid? null : error
  };
}

const ID_PREFIX = "missions.requester.instancePanel.finalize.";

const props = Object.keys({
  expRatio: "",
  credits: "",
  comment: "",
  requireExpRatio: "",
  requireCredits: ""

}).reduce((prev, curr) => ({...prev, [curr]: ID_PREFIX + curr}), {});



@observer
export class FinalizeForm extends React.Component<Props, {}> {

  @action onCreditsChange = (e) => {

    this.props.value.credits = e.target.value;
  };

  @action onExpRadioChange = (e) => {
    this.props.value.expRatio = e.target.value;
  };

  @action onCommentChange = (e) => {
    this.props.value.comment = e.target.value;
  };

  render() {
    const { value } = this.props;
    return <Localize replacements={props}>
      {
        props => <Form className="login-form">
          <FormItem {...formItemProps(value.expRadioValid, props.requireExpRatio)}
          >
            <Input addonBefore={props.expRatio}
                   disabled={this.props.readonly}
                   onChange={this.onExpRadioChange}
                   placeholder={props.expRatio}
                   value={value.expRatio}
            />
          </FormItem>
          <FormItem  {...formItemProps(value.creditsValid, props.requireCredits)}>
            <Input addonBefore={props.credits}
                   disabled={this.props.readonly}
                   onChange={this.onCreditsChange}
                   placeholder={props.expRatio}
                   value={value.credits}
            />
          </FormItem>
          <FormItem {...formItemProps(true, null)}>
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
