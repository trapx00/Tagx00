import React from 'react';
import { InstanceDetail } from "../../../../models/instance/InstanceDetail";
import { MissionDetail } from "../../../../models/mission/MissionDetail";
import { TextInstanceDetail } from "../../../../models/instance/text/TextInstanceDetail";
import { TextMissionDetail } from "../../../../models/mission/text/TextMissionDetail";
import { Inject } from "react.di";
import { WorkerService } from "../../../../api/WorkerService";
import { TextNotation, TextWorkPageController } from "./TextWorkPageController";
import { WorkPage, WorkPageProps } from "../WorkPage";
import { TextJob } from "../../../../models/instance/text/job/TextJob";

interface Props {
  instanceDetail: TextInstanceDetail;
  missionDetail: TextMissionDetail;
  readonlyMode: boolean;

  jumpBack(): void;
}

export class TextWorkPage extends React.Component<Props, {}> {

  @Inject controller: TextWorkPageController = new TextWorkPageController(this.props.missionDetail, this.props.instanceDetail);

  chooseWorkPage = (context: WorkPageProps<TextMissionDetail, TextJob, TextNotation>) => {
    return null;
  };

  render() {
    return <WorkPage readonlyMode={this.props.readonlyMode}
                     chooseWorkPage={this.chooseWorkPage}
                     controller={this.controller}
                     jumpBack={this.props.jumpBack}

    />
  }
}
