import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { LocaleMessage, Localize } from "../../../../internationalization/components";
import { FinalizeForm } from "./FinalizeForm";
import { FormItem } from "../../../../components/Form/FormItem";

export interface FinalizeInfo {
  exp: number;
  expRatio: number;
  credits: number;
  comment: string;
}

interface Props {
  info: FinalizeInfo;

  close(): void;
}

const ID_PREFIX = "missions.requester.instancePanel.finalize.";

const props = [
  "expRatio",
  "credits",
  "comment",
  "exp",
  "requireExpRatio",
  "requireCredits"
].reduce((prev, curr) => ({...prev, [curr]: ID_PREFIX + curr}), {});

export class FinalizeInfoModal extends React.Component<Props, {}> {

  goBack = () => {
    this.props.close();
  };

  render() {
    return <Modal visible={true} title={<LocaleMessage id={ID_PREFIX + "title"}/>}
                  onCancel={this.goBack}
                  footer={[
                    <Button key={"back"} type={"primary"} onClick={this.goBack}>
                      <LocaleMessage id={ID_PREFIX + "back"}/>
                    </Button>
                  ]}
    >
      <Localize replacements={props}>
        {
          props => <Form className="login-form">
            <Input addonBefore={props.expRatio}
                   disabled={true}
                   placeholder={props.expRatio}
                   value={this.props.info.expRatio}
            />
            <Input addonBefore={props.exp}
                   value={this.props.info.exp}
                   disabled={true}
            />
            <Input addonBefore={props.credits}
                   value={this.props.info.credits}
                   disabled={true}
            />
            <Input.TextArea
              disabled={true}
              placeholder={props.comment}
              value={this.props.info.comment}
            />
          </Form>
        }
      </Localize>
    </Modal>
  }
}
