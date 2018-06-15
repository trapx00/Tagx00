import React from 'react';
import { Button, Card, Icon, Modal } from 'antd';
import { LocaleMessage } from "../../../internationalization/components";
import { Inject } from "react.di";
import { LocaleStore } from "../../../stores/LocaleStore";


interface Props {
  goNext: () => void;
  goPrevious: () => void;
  previousAvailable: boolean;
  readonlyMode: boolean;
  saveProgress: () => void;
  toFirstIncomplete: () => void;
  submit: () => void;
  saving: boolean;
  canGoPrevious: boolean,
  canGoNext: boolean;
}

const ID_PREFIX = "drawingPad.common.progressController.";

export class ProgressController extends React.Component<Props, {}> {

  @Inject localeStore: LocaleStore;

  showSubmitConfirm = () => {


    Modal.confirm({
      title: this.localeStore.get(ID_PREFIX+"confirmTitle"),
      content: this.localeStore.get(ID_PREFIX+"confirmDescription"),
      onOk: this.props.submit
    })
  };

  render() {
    return <Card>
        <Button.Group size={"large"}>
          <Button disabled={!this.props.canGoPrevious} onClick={this.props.goPrevious}>
            <Icon type="left" /><LocaleMessage id={ID_PREFIX+"backward"}/>
          </Button>
          <Button disabled={!this.props.canGoNext} onClick={this.props.goNext}>
            <LocaleMessage id={ID_PREFIX+"forward"}/><Icon type="right" />
          </Button>
        </Button.Group>
      <Button.Group size={"large"}>
        {this.props.readonlyMode ? null :
          <Button type="primary" onClick={this.props.saveProgress} loading={this.props.saving}>
            <Icon type="save"/><LocaleMessage id={ID_PREFIX + "save"}/>
          </Button>
        }
        <Button onClick={this.props.toFirstIncomplete}>
          <Icon type="edit" /><LocaleMessage id={ID_PREFIX+"toFirstIncomplete"}/>
        </Button>
        <Button onClick={this.showSubmitConfirm}>
          <Icon type="check" /><LocaleMessage id={ID_PREFIX+"submit"}/>
        </Button>


      </Button.Group>

    </Card>;
  }
}
