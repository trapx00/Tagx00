import React from 'react';
import { Card, Button} from 'antd';

interface Props {
  start: () => void;
  addingMode: boolean;
}

export class PartAddingModeController extends React.Component<Props, {}> {
  render() {
    return <Card>
      <Button onClick={this.props.start} disabled={this.props.addingMode}>
        Add
      </Button>
    </Card>
  }
}
