import React from 'react';
import { DistrictDrawingSession, Step } from "./DrawingPad/DistrictPanel/DistrictCanvas/DistrictDrawingSession";
import { District } from "./DrawingPad/DistrictPanel/Districts";
import { Card, Button } from 'antd';
import { observer } from "mobx-react";

interface Props {
  session: DistrictDrawingSession;
  onDistrictComplete: (dis: District) => void;
  start: () => void;
  addingMode: boolean;
}

@observer
export class DistrictAddingModeController extends React.Component<Props, {}> {
  render() {

    if (!this.props.addingMode) {
      return <Card>
        <Button onClick={this.props.start} disabled={this.props.addingMode}>
          Add
        </Button>
      </Card>;
    }

    let main;
    switch (this.props.session.step) {
      case Step.ReadyToDraw:
        main = <p>请按下鼠标，开始滑动出闭合区域。</p>;
        break;
      case Step.DrawingBoundary:
        main = <p>请按住鼠标滑动出一块不相交的闭合区域。</p>;
        break;
      case Step.BoundaryDrawn:
        main = <div>您已经滑动出一个闭合区域。您可以
          <Button onClick={() => this.props.session.continueDrawing()}>继续滑动闭合区域</Button>
          ，或者<Button onClick={() => this.props.onDistrictComplete(this.props.session.district)}> 确认区域</Button>。
        </div>

    }

    return <Card>
      {main}
    </Card>

  }
}
