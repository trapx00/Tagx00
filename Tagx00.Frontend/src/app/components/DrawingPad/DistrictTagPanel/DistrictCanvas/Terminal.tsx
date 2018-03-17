import React from "react";
import { DistrictDrawingSession, SessionStep } from "./DistrictDrawingSession";
import { observer } from "mobx-react";
import { action } from "mobx";

interface TerminalProps {
  session: DistrictDrawingSession;
}

@observer
export class Terminal extends React.Component<TerminalProps, {}> {

  render() {

    let main;
    switch (this.props.session.step) {
      case SessionStep.NotStarted:
        main = <p>请按下鼠标，开始滑动出闭合区域。</p>;
        break;
      case SessionStep.SelectingArea:
        main = <p>您已经滑动出一个闭合区域。请用鼠标点击一个区域的内点，以确定区域。</p>;
        break;
      case SessionStep.DrawingBoundary:
        main = <p>请使用按住鼠标滑动出一块不相交的闭合区域。</p>;
        break;
      case SessionStep.AreaSelected:
        main = <p>您已经选择了一块区域。您可以继续滑动区域，或者提交这个区域。</p>;
        break;
    }

    return <div>
      {main}
      <p>{this.props.session.error}</p>
    </div>

  }
}