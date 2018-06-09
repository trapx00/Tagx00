import React from 'react';
import { Button, Card } from 'antd';
import { LocaleMessage } from "../../../../../internationalization/components";

interface Props {
  start: () => void;
  addingMode: boolean;
  removeSelected: () => void;
}

export class PartAddingModeController extends React.Component<Props, {}> {
  render() {
    const prefix = "drawingPad.rectangle.";
    return <Card>
      <Button onClick={this.props.start} disabled={this.props.addingMode}>
        <LocaleMessage id={prefix+"add"}/>
      </Button>
      <Button onClick={this.props.removeSelected}>
        <LocaleMessage id={prefix+"removeSelected"}/>
      </Button>
    </Card>
  }
}
