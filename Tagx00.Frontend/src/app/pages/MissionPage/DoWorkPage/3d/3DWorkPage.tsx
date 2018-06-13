import React from 'react';
import { RootWorkPageProps, WorkPage, WorkPageProps } from "../WorkPage";
import { ThreeDimensionMissionDetail, ThreeDimensionMissionType } from "../../../../models/mission/3d/3dMission";
import { ThreeDimensionInstanceDetail } from "../../../../models/instance/3d/3dInstanceDetail";
import { ThreeDimensionWorkPageController } from "./3DWorkPageController";
import { ThreeDimensionJob } from "../../../../models/instance/3d/job/3dJob";
import { ThreeDimensionNotation } from "./shared";
import { ThreeDimensionWholeWorkPage } from "./3DWholeWorkPage";
import { observer } from "mobx-react";


interface Props extends RootWorkPageProps<ThreeDimensionMissionDetail, ThreeDimensionInstanceDetail> {

}

@observer
export class ThreeDimensionWorkPage extends React.Component<Props, {}> {

  controller = new ThreeDimensionWorkPageController(this.props.missionDetail, this.props.instanceDetail);

  chooseWorkPage = (context: WorkPageProps<ThreeDimensionMissionDetail, ThreeDimensionJob, ThreeDimensionNotation<ThreeDimensionJob>>) => {
    switch (context.notation.job.type) {
      case ThreeDimensionMissionType.WHOLE:
        return <ThreeDimensionWholeWorkPage {...context as any}/>;
    }
  };

  render() {
    return <WorkPage
      controller={this.controller}
      chooseWorkPage={this.chooseWorkPage}
      jumpBack={this.props.jumpBack}
      readonlyMode={this.props.readonlyMode}
    />
  }
}
