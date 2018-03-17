import React from "react";
import { DistrictDrawingSession, Step } from "./DistrictCanvas/DistrictDrawingSession";
import { observer } from "mobx-react";
import { action } from "mobx";

interface TerminalProps {
  session: DistrictDrawingSession;
  goSelectingArea: () => void;
  continueDrawing: () => void;
}

@observer
export class Terminal extends React.Component<TerminalProps, {}> {

  render() {

    let main;
    switch (this.props.session.step) {
      case Step.ReadyToDraw:
        main = <p>请按下鼠标，开始滑动出闭合区域。</p>;
        break;
      case Step.SelectingArea:
        main = <p>请用鼠标点击一个区域的内点，以确定区域。</p>;
        break;
      case Step.DrawingBoundary:
        main = <p>请使用按住鼠标滑动出一块不相交的闭合区域。</p>;
        break;
      case Step.AreaSelected:
        main = <p>您已经选择了一块区域。您可以继续滑动区域，或者提交这个区域。</p>;
        break;
      case Step.BoundaryDrawn:
        main = <p>您已经滑动出一个闭合区域。您可以<button onClick={this.props.continueDrawing}>继续滑动闭合区域</button>，或者开始<button onClick={this.props.goSelectingArea}> 确认区域</button>。</p>

    }

    return <div>
      {main}
      <p>{this.props.session.error}</p>
    </div>

  }
}
