import React from "react";
import { DistrictDrawingSession, Step } from "./DistrictDrawingSession";
import { observer } from "mobx-react";
import { District } from "../Districts";

interface Props {
  session: DistrictDrawingSession;
  onDistrictComplete: (dis: District) => void;
}

@observer
export class CanvasController extends React.Component<Props, {}> {

  render() {

    let main;
    switch (this.props.session.step) {
      case Step.ReadyToDraw:
        main = <p>请按下鼠标，开始滑动出闭合区域。</p>;
        break;
      case Step.DrawingBoundary:
        main = <p>请按住鼠标滑动出一块不相交的闭合区域。</p>;
        break;
      case Step.BoundaryDrawn:
        main = <p>您已经滑动出一个闭合区域。您可以
          <button onClick={() => this.props.session.continueDrawing()}>继续滑动闭合区域</button>
          ，或者<button onClick={() => this.props.onDistrictComplete(this.props.session.district)}> 确认区域</button>。</p>

    }

    return <div>
      {main}
      <p>{this.props.session.error}</p>
    </div>

  }
}
