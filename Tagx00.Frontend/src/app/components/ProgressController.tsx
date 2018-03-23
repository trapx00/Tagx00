import React from 'react';
import { Card, Button, Icon } from 'antd';


interface Props {
  goNext: () => void;
  goPrevious: () => void;
  previousAvailable: boolean;
  saveProgress: () => void;
}

export class ProgressController extends React.Component<Props, {}> {
  render() {
    return <Card style={{marginTop: "8px"}}>
      <Button.Group size={"large"}>
        <Button onClick={this.props.goPrevious}>
          <Icon type="left" />Backward
        </Button>
        <Button type="primary" onClick={this.props.saveProgress}>
          <Icon type="save" />Save
        </Button>
        <Button onClick={this.props.goNext}>
          Forward<Icon type="right" />
        </Button>
      </Button.Group>
    </Card>;
  }
}