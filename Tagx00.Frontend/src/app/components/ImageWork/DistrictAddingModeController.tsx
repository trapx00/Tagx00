import React from 'react';
import { DistrictDrawingSession, Step } from "./DrawingPad/DistrictPanel/DistrictCanvas/DistrictDrawingSession";
import { District } from "./DrawingPad/DistrictPanel/Districts";
import { Card, Button } from 'antd';
import { observer } from "mobx-react";
import { LocaleMessage } from "../../internationalization/components";

interface Props {
  session: DistrictDrawingSession;
  onDistrictComplete: (dis: District) => void;
  start: () => void;
  addingMode: boolean;
  onRemoveSelected: () => void;
}

@observer
export class DistrictAddingModeController extends React.Component<Props, {}> {
  render() {
    const { addingMode, session } = this.props;
    const prefix = "drawingPad.district.";
    if (!addingMode) {
      return <Card>
        <Button onClick={this.props.start} disabled={addingMode}>
          <LocaleMessage id={prefix+"add"}/>
        </Button>
        <Button onClick={this.props.onRemoveSelected}>
          <LocaleMessage id={prefix+"removeSelected"}/>
        </Button>
      </Card>;
    }

    let main;
    switch (session.step) {
      case Step.ReadyToDraw:
        main = <p><LocaleMessage id={prefix+"prompts.readyToDraw"}/></p>;
        break;
      case Step.DrawingBoundary:
        main = <p><LocaleMessage id={prefix+"prompts.drawingBoundary"}/></p>;
        break;
      case Step.BoundaryDrawn:
        main = <div><LocaleMessage id={prefix+"prompts.boundaryDown"} replacements={{
          continueDrawing:
            <Button onClick={() => session.continueDrawing()}>
              <LocaleMessage id={prefix+"prompts.continueDrawing"}/>
            </Button>,
          confirm: <Button onClick={() => this.props.onDistrictComplete(session.district)}>
            <LocaleMessage id={prefix+"prompts.confirm"}/>
          </Button>
        }}/>
        </div>

    }

    return <Card>
      {main}
      { session.error
        ? <div><hr/>
      <p><strong><LocaleMessage id={prefix+"prompts.error.errorTip"}/></strong></p>
      <p><LocaleMessage id={`${prefix}prompts.error.${session.error}`}/></p>
        </div>
        :null}
    </Card>

  }
}
